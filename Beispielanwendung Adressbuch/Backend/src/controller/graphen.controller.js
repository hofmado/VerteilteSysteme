"use strict"

import graphen_service from "../service/SteuerGraphen.js";
import {wrapHandler} from "../utils.js";
import RestifyError from "restify-errors";

/**
 * HTTP-Controller-Klasse für Steuerjahr. Diese Klasse registriert alle notwendigen
 * URL-Handler beim Webserver für einen einfachen REST-Webservice zum Lesen und
 * Schreiben von Steuerjahren.
 */
export default class GraphenController {
    /**
     * Konstruktor. Hier werden die URL-Handler registrert.
     *
     * @param {Object} server Restify Serverinstanz
     * @param {String} prefix Gemeinsamer Prefix aller URLs
     */
    constructor(server, prefix) {
        this._service = new graphen_service();
        this._prefix = prefix;

        // Collection: Graphen

        // Post
       // server.post(prefix, wrapHandler(this, this.create)); 

       //Get
       server.get(prefix + "/:user_id", wrapHandler(this, this.graphenzeug));
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
            graphenzeug:   {url: url, method: "GET"},
        }
    }

    /**
     * GET /graphen
     */
    async graphenzeug(req, res, next) {
        let result = await this._service.Graphenzeug();
      
        if (result) {
          this._insertHateoasLinks(result);
          res.sendResult(result);
        } else {
          throw new RestifyError.NotFoundError("Kein Graphen gefunden");
        }
      
        return next();
    }
}