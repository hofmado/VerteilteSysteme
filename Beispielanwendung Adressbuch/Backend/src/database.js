"use strict"

import { MongoClient } from "mongodb";

/**
 * Singleton-Klasse zum Zugriff auf das MongoDB-Datenbankobjekt, ohne dieses
 * ständig als Methodenparameter durchreichen zu müssen. Stattdessen kann
 * einfach das Singleton-Objekt dieser Klasse importiert und das Attribut
 * `mongodb` oder `database` ausgelesen werden.
 */
class DatabaseFactory {
    /**
     * Ersatz für den Konstruktor, damit aus dem Hauptprogramm heraus die
     * Verbindungs-URL der MongoDB übergeben werden kann. Hier wird dann
     * auch gleich die Verbindung hergestellt.
     *
     * @param {String} connectionUrl URL-String mit den Verbindungsdaten
     */
    async init(connectionUrl) {
        // Datenbankverbindung herstellen
        this.client = new MongoClient(connectionUrl);
        await this.client.connect();
        this.database = this.client.db("Steuer");
        await this._createDemoData();
    }

    /**
     * Hilfsmethode zum Anlegen von Demodaten. Würde man so in einer
     * Produktivanwendung natürlich nicht machen, aber so sehen wir
     * wenigstens gleich ein paar Daten.
     */
    async _createDemoData() {
        let users     = this.database.collection("user");
        
        if (await users.estimatedDocumentCount() === 0) {
            users.insertMany([
                {
                    "username": "MaxMustermann",
                    "password": "geheimesPasswort",
                    
                },
                {
                    "username": "MusterMAx",
                    "password": "1",
                }
            ])
        }
        let steuerjahr = this.database.collection("steuerjahr");

        if (await steuerjahr.estimatedDocumentCount() === 0) {
            steuerjahr.insertMany([
                {
                    "user_id": "6420557cd5033a24fc6777aa",
                    "jahr": 2023,
                    "werbungskosten": 2500
                },
            ]);
            steuerjahr.insertMany([
                {
                    "user_id": "6420557cd5033a24fc6777aa",
                    "jahr": 2022,
                    "werbungskosten": 2500
                },
                {
                    "user_id": "6420557cd5033a24fc6777aa",
                    "jahr": 2021,
                    "werbungskosten": 5500
                },
            ]);
        } 
    }
}

export default new DatabaseFactory();
