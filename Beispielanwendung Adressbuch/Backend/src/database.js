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
        this.database = this.client.db("Steuerjahr");
        

        await this._createDemoData();
    }

    /**
     * Hilfsmethode zum Anlegen von Demodaten. Würde man so in einer
     * Produktivanwendung natürlich nicht machen, aber so sehen wir
     * wenigstens gleich ein paar Daten.
     */
    async _createDemoData() {
        let user = this.database.collection("user", {
            validator: {
              $jsonSchema: {
                bsonType: "object",
                required: ["username", "password", "semester", "steuern"],
                properties: {
                  username: {
                    bsonType: "string",
                    description: "must be a string and is required"
                  },
                  password: {
                    bsonType: "string",
                    description: "must be a string and is required"
                  },
                  semester: {
                    bsonType: "int",
                    minimum: 1,
                    description: "must be an int greater than 1"
                  },
                  steuern: {
                    bsonType: "int",
                    minimum: 0,
                    description: "must be an int greater or equal to 0"
                  },
                }
              }
              
            }
            
        });
        let steuerjahr = this.database.collection("steuerjahr", {
            validator: {
              $jsonSchema: {
                bsonType: "object",
                required: ["username", "jahr", "steuerablassung"],
                properties: {
                  username: {
                    bsonType: "string",
                    description: "must be a string and is required"
                  },
                  jahr: {
                    bsonType: "int",
                    minimum: 1900,
                    description: "must be an int greater than 1900"
                  },
                  steuerablassung: {
                    bsonType: "int",
                    minimum: 1900,
                    description: "must be an int greater tahn 1900"
                  },
                }
              }
            }
        });

        if (await user.estimatedDocumentCount() === 0) {
            user.insertMany([
                {
                    username: "Max",
                    password: "1",
                    gesamt_steuer: "6000",
                    semester: "4",
                },
            ]);
        }
        if (await steuerjahr.estimatedDocumentCount() === 0) {
            steuerjahr.insertMany([
                {
                    username: "Max",
                    jahr: "2022",
                    steuerablassung: "2500",
                },
                {
                    username: "Max",
                    jahr: "2021",
                    steuerablassung: "3500",
                },
            ]);
        } 
    }
}

export default new DatabaseFactory();
