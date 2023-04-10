"use strict"

//Steuert API, Funktionen in API werden hier nochmal angegeben, sagt wo was gemacht wird

//import steuerjahr_service from "../service/Steuerjahr.service.js";
import berechnungen_service from "../service/berechnungen.service.js"; //Service anlegen!!!
import {wrapHandler} from "../utils.js";
import RestifyError from "restify-errors";

/**
 * HTTP-Controller-Klasse für Steuerjahr. Diese Klasse registriert alle notwendigen
 * URL-Handler beim Webserver für einen einfachen REST-Webservice zum Lesen und
 * Schreiben von Steuerjahren.
 */
export default class BerechnungenControllerClass {
    /**
     * Konstruktor. Hier werden die URL-Handler registrert.
     *
     * @param {Object} server Restify Serverinstanz
     * @param {String} prefix Gemeinsamer Prefix aller URLs
     */
    constructor(server, prefix) {
        this._service = new berechnungen_service();
        this._prefix = prefix;

        //Collection: Gesamteinsparungen
        server.post(prefix + "/gesamteinsparungen", wrapHandler(this, this.createGesamteinsparungen));

        //Collection: Einsparungsjahr
        server.get(prefix + "/:user_id" + "/:jahr", wrapHandler(this, this.getEinsparungsjahr));
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
        let url = `${this._prefix}/einsparungsjahr/${entity._id}`;
    
        entity._links = {
          getEinsparungsjahr: { url: url, method: "GET" },
    }
}

    //GetEinsparungsjahr
    async getEinsparungsjahr(req, res, next) {
        let result = await this._service.getEinsparungsjahr(req.params.user_id, req.params.jahr);
        if (result) {
          this._insertHateoasLinks(result);
          res.sendResult(result);
        } else {
          throw new RestifyError.NotFoundError("Kein Einsparungsjahr gefunden");
        }
      
        return next();
    }

    //createGesamteinsparungen
    async createGesamteinsparungen(req, res, next){
        let result = await this._service.createGesamteinsparungen(req.body);
        this._insertHateoasLinks(result);

        res.status(201);
        res.header("Location", `${this._prefix}/gesamteinsparungen/${result._id}`);
        res.sendResult(result);

        return next();
    }
}
    /**
     * POST /user/steuerjahr
     
    async createSteuerjahr(req, res, next) { 
        let result = await this._service.createSteuerjahr(req.body);//TODO nennen wie collection element in API
        this._insertHateoasLinks(result);

        res.status(201);
        res.header("Location", `${this._prefix}/${result._id}`);
        res.sendResult(result);

        return next();
    }
}*/