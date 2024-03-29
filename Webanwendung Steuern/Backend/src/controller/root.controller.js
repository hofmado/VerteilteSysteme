"use strict"

import {wrapHandler} from "../utils.js";
import path from "path";
import { readFile } from "fs/promises";

/**
 * Controller für die Wurzeladresse des Webservices. Ermöglicht in dieser
 * Fassung den Abruf der OpenAPI-Spezifikation unter `/?openapi` sowie den
 * Abruf einer HATEOAS-Übersucht unter `/`.
 */
export default class RootController {
    /**
     * Konstruktor. Hier werden die URL-Handler registrert.
     *
     * @param {Object} server Restify Serverinstanz
     * @param {String} prefix Gemeinsamer Prefix aller URLs
     * @param {String} openApiFile Pfad zur OpenAPI-Datei
     */
    constructor(server, prefix, openApiFile) {
        this._openApiFile = openApiFile;

        server.get(prefix, wrapHandler(this, this.index));
        server.get(prefix + "/openapi.yaml", wrapHandler(this, this.openApi));
    }
    /**
     * GET /openapi.yaml:
     * Abruf der OpenAPI-Spezifikation
     */
    
    

    async index(req, res, next) {
        res.sendResult([
            
            {
                _name: "user",
                login: {url: "/user/login", method: "POST"},
                create: {url: "/user", method: "POST"},
            },
            {    
                _name: "steuerjahr",
                create: {url: "/steuerjahr", method: "POST"},
            },
            {
                _name: "graphen",
                create: {url: "/graphen", method: "POST"},
            }
        ]);

        next();
    }

    async openApi(req, res, next) {
        if (req.query.openapi !== undefined) {
            let filecontent = await readFile(this._openApiFile);

            res.status(200);
            res.header("content-type", "application/openapi+yaml");
            res.sendRaw(filecontent);
        } else {
            res.send();
        }

        next();
    }
}
