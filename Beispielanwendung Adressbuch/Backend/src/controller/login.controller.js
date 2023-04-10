"use strict"

import LoginService from "../service/login.service.js";
import {wrapHandler} from "../utils.js";
import RestifyError from "restify-errors";

/**
 * HTTP-Controller-Klasse für Adressbucheinträge. Diese Klasse registriert
 * alle notwendigen URL-Handler beim Webserver für einen einfachen REST-
 * Webservice zum Lesen und Schreiben von Adressen.
 */
export default class LoginController {
    /**
     * Konstruktor. Hier werden die URL-Handler registriert.
     *
     * @param {Object} server Restify Serverinstanz
     * @param {String} prefix Gemeinsamer Prefix aller URLs
     */
    constructor(server, prefix) {
        this._service = new LoginService();
        this._prefix = prefix;

        // Collection: Users
        server.post(prefix, wrapHandler(this, this.createUser));

        // Entity: User
        server.get(prefix + "/:username" + "/:password", wrapHandler(this, this.getUser));
        
    }

    /**
     * Hilfsmethode zum Einfügen von HATEOAS-Links in einen Datensatz.
     * Dem Datensatz wird ein Attribut `_links` gemäß der OpenAPI-Spezifikation
     * hinzugefügt, damit ein Client erkennen kann, wie er die Entität lesen,
     * ändern oder löschen kann.
     *
     * @param {Object} entity Zu verändernder Datensatz
     */
    _insertHateoasLinks(entity) {
        let url = `${this._prefix}/${entity.username}/${entity.password}`;

        entity._links = {
            getUser:   {url: url, method: "GET"},
        }
    }

    /**
     * POST /user
     * Neue Adresse anlegen
     */
    async createUser(req, res, next) {
        let result = await this._service.create(req.body);
        this._insertHateoasLinks(result);

        res.status(201);
        res.header("Location", `${this._prefix}/${result._id}`);
        res.sendResult(result);

        return next();
    }

    /**
     * 
     * GET /user/ username/password
     * USER auslesen
     */
    async getUser(req1, res, next) {
        let userId = await this._service.readUser(req1.params.username, req1.params.password);
        console.log("Kommst du hierhin2?");
        if (userId) {
            res.sendResult({_id: userId});
        } else {
            throw new RestifyError.NotFoundError("An error occured");
        }

        return next();
    }
  
}
