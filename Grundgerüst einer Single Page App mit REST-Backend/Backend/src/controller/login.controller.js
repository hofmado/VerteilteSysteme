"use strict"

import loginService from "../service/loginService.js";
import {wrapHandler} from "../utils.js";
import RestifyError from "restify-errors";

/**
 * HTTP-Controller-Klasse für Logins. Diese Klasse registriert alle notwendigen
 * URL-Handler beim Webserver für einen einfachen REST-Webservice zum Lesen und
 * Schreiben von Usernames und Passwort.
 */
export default class loginController {
    /**
     * Konstruktor. Hier werden die URL-Handler registrert.
     *
     * @param {Object} server Restify Serverinstanz
     * @param {String} prefix Gemeinsamer Prefix aller URLs
     */
    constructor(server, prefix) {
        this._service = new loginService();
        this._prefix = prefix;

        // Collection: Adressen
        server.get(prefix, wrapHandler(this, this.search));
        server.post(prefix, wrapHandler(this, this.create));

        // Entity: Adresse
        server.get(prefix + "/:id", wrapHandler(this, this.read));
        server.put(prefix + "/:id", wrapHandler(this, this.update));
        server.patch(prefix + "/:id", wrapHandler(this, this.update));
        
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
            update: {url: url, method: "PUT"},
            patch:  {url: url, method: "PATCH"},
        }
    }

    /**
     * GET /username pw
     * Username und Passwort suchen
     */
    async search(req1, req2, res1, res2, next) {
        let result1 = await this._service.search(req1.query);
        result1.forEach(entity => this._insertHateoasLinks(entity));
        res1.sendResult(result1);

        if(result1){}
        else {
            throw new RestifyError.NotFoundError("Username not found")
        }
        let result2 = await this._service.search(req2.query);
        result2.forEach(entity => this._insertHateoasLinks(entity));
        res2.sendResult(result2);

        if(result2){}
        else{
            throw new RestifyError.NotFoundError("Password wrong")
        }
        return next();
    }

    /**
     * POST /user
     * Neuen User anlegen
     */
    async create(req1,req2, res1,res2, next) {
        let result1 = await this._service.create(req1.body);
        this._insertHateoasLinks(result1);

        res1.status(201);
        res1.header("Location", `${this._prefix}/${result1._id}`);
        res1.sendResult(result1);

        let result2 = await this._service.create(req2.body);
        this._insertHateoasLinks(result2);

        res2.status(201);
        res2.header("Location", `${this._prefix}/${result1._id}`);
        res2.sendResult(result2);
        return next();
    }

    
}
