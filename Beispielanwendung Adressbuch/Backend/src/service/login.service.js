"use strict"

import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";

/**
 * Geschäftslogik zur Verwaltung von Adressen. Diese Klasse implementiert die
 * eigentliche Anwendungslogik losgelöst vom technischen Übertragungsweg.
 * Die Adressen werden der Einfachheit halber in einer MongoDB abgelegt.
 */
export default class LoginService {
    /**
     * Konstruktor.
     */
    constructor() {
        this._users = DatabaseFactory.database.collection("users");
    }

    /**
     * @param {Object} query Optionale Suchparameter
     * @return {Promise} Liste der gefundenen Adressen
     */
    async search(query) {
        let cursor = this._users.findOne(query, {
            sort: {
                username: 1,
                password:0,
            }
        });

        return cursor.toArray();
    }

    /**
     * Speichern einer neuen Adresse.
     *
     * @param {Object} user Zu speichernde Adressdaten
     * @return {Promise} Gespeicherte Adressdaten
     */
    async create(user) {
        user = user || {};

        let newUser = {
            username: user.username || "",
            password:  user.password  || "",
        };

        let result = await this._users.insertOne(newUser);
        return await this._users.findOne({_id: result.insertedId});
    }
}
