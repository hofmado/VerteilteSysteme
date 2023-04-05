"use strict"

import steuerjahr_service from "../service/Steuerjahr.servie.js";
import {wrapHandler} from "../utils.js";
import RestifyError from "restify-errors";

/**
 * HTTP-Controller-Klasse für Steuerjahr. Diese Klasse registriert alle notwendigen
 * URL-Handler beim Webserver für einen einfachen REST-Webservice zum Lesen und
 * Schreiben von Steuerjahren.
 */
export default class SteuerjahrController {
    /**
     * Konstruktor. Hier werden die URL-Handler registrert.
     *
     * @param {Object} server Restify Serverinstanz
     * @param {String} prefix Gemeinsamer Prefix aller URLs
     */
    constructor(server, prefix) {
        this._service = new steuerjahr_service();
        this._prefix = prefix;

        //Entity Steuerjahr
        server.get(prefix + "/:user_id" + "/:jahr", wrapHandler(this, this.readSteuerjahr));
        server.post(prefix + "/:user_id" + "/:jahr" + "/:kosten" + "/:fahrtweg", wrapHandler(this, this.createSteuerjahr));
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
        let url = `${this._prefix}/${entity.user_id}/${entity.jahr}`;

        entity._links = {
            readSteuerjahr:   {url: url, method: "GET"},
        }
    }

    /**
     * GET /steuerjahr/{jahr}
     */
    async readSteuerjahr(req, res, next) {
        let result = await this._service.readSteuerjahr(req.params.user_id, req.params.jahr);
        if (result) {
          this._insertHateoasLinks(result);
          res.sendResult(result);
        } else {
          throw new RestifyError.NotFoundError("Kein Steuerjahr gefunden");
        }
      
        return next();
    }
    /**
     * POST /user/steuerjahr
     */ 
    async createSteuerjahr(req, res, next) { 
        let result = await this._service.createSteuerjahr(req.params.user_id, req.params.jahr, req.params.kosten, req.params.fahrtweg);

        if (result) {
            this._insertHateoasLinks(result);
            res.sendResult(result);
        } else {
            throw new RestifyError.NotFoundError("Erstellen lief schief.");
        }
    
        return next();
    }
}