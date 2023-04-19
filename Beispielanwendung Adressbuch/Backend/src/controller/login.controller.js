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
        server.post(prefix +"/login", wrapHandler(this, this.getUser))
        // Entity: User
        
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
        let url = `${this._prefix}/user`;

        entity._links = {
            getUser:   {url: url, method: "POST"},
        }
    }

    /**
     * POST /user
     * Neue Adresse anlegen
     */
    async createUser(req, res, next) {
        let result = await this._service.createUser(req.body);
        this._insertHateoasLinks(result);

        res.status(201);
        res.header("Location", `${this._prefix}/${result._id}`);
        res.sendResult(result);

        return next();
    }

    /**
     * 
     * GET /user/login
     * USER auslesen
     */
    async getUser(req1, res, next) {
        let User = await this._service.readUser(req1.body.username, req1.body.password);
        if (User != "null") {
            res.sendResult({User});
        } else {
            throw new RestifyError.NotFoundError("An error occured");
        }

        return next();
    }
  
}
