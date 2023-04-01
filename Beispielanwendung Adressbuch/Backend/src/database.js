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
                    "Gesamt-Werbungskosten": 5000,
                    "Gesamt-Einkommen": 25000,
                    "username": "MaxMustermann",
                    "password": "geheimesPasswort",
                    "Steuerjahr": {
                      "Jahr": 2000,
                      "Werbungskosten": 5000
                    },
                    "Steuerjahr": {
                        "Jahr": 2002,
                        "Werbungskosten": 5000
                      },
                      "Steuerjahr": {
                        "Jahr": 2001,
                        "Werbungskosten": 5000
                      },
                },
                {
                    "Gesamt-Werbungskosten": 2000,
                    "Gesamt-Einkommen": 15000,
                    "username": "MusterMAx",
                    "password": "1",
                    "Steuerjahr": {
                      "Jahr": 2000,
                      "Werbungskosten": 1000
                    },
                    "Steuerjahr": {
                        "Jahr": 2002,
                        "Werbungskosten": 500
                    },
                    "Steuerjahr": {
                        "Jahr": 2001,
                        "Werbungskosten": 5000
                    },
                }
            ])
        }
    }
}

export default new DatabaseFactory();
