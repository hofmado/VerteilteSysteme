"use strict"

import kalk_service from "../service/ms_kalk.js";
import {wrapHandler} from "../utils.js";
import RestifyError from "restify-errors";

/**
 * HTTP-Controller-Klasse für Songs. Diese Klasse registriert alle notwendigen
 * URL-Handler beim Webserver für einen einfachen REST-Webservice zum Lesen und
 * Schreiben von Songs.
 */
export default class KalkController {
    /**
     * Konstruktor. Hier werden die URL-Handler registrert.
     *
     * @param {Object} server Restify Serverinstanz
     * @param {String} prefix Gemeinsamer Prefix aller URLs
     */
    constructor(server, prefix) {
        this._service = new kalk_service();
        this._prefix = prefix;

        // Collection: Steuerjahr
        server.get(prefix, wrapHandler(this, this.search));
        server.put(prefix, wrapHandler(this, this.create));
    }

    /**
     * Hilfsmethode zum Einfügen von HATEOAS-Links in einen Datensatz.
     * Dem Datensatz wird ein Attribut `_links` gemäß der OpenAPI-Spezifikation
     * hinzugefügt, damit ein Client erkennen kann, wie er die Entität lesen,
     * ändern oder löschen kann.
     *
     * @param {Object} entity Zu verändernder Datensatz.
     */
    _insertHateoasLinks(entity) {
        let url = `${this._prefix}/${entity._id}`;

        entity._links = {
            read:   {url: url, method: "GET"},
            update: {url: url, method: "POST"},
        }
    }

    /**
     * GET /steuerjahr
     */
    async read(req, res, next) {
        let result = await this._service.read(req.params.username, req.params.jahr);

        if (result) {
            this._insertHateoasLinks(result);
            res.sendResult(result);
        } else {
            throw new RestifyError.NotFoundError("Kein Steuerjahr gefunden");
        }

        return next();
    }

    /**
     * POST /user/steuerjahr/:id
     * Neuen Song anlegen 
     */ 
    async createSteuerjahr(req, res, next) { 
        let result = await this._service.create(req.body);
        this._insertHateoasLinks(result);

        res.status(201);
        res.header("Location", `${this._prefix}/${result._id}`);
        res.sendResult(result);

        return next();
    }
}