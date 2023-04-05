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

        let steuerjahr = this.database.collection("steuerjahr");


        let user = this.database.collection("steuerjahr");
        if (await user.estimatedDocumentCount() === 0) {
            user.insertMany([
                {
                    "Jahr": 2020,
                    "Werbungskosten": 5000
                },
            ]);
        }
    
        if (await steuerjahr.estimatedDocumentCount() === 0) { 

            steuerjahr.insertMany([
                {
                    jahr: "2022",
                    steuerablassung: "2500",
                },
                {
                    jahr: "2021",
                    steuerablassung: "3500",
                },
            ]);
        } 
    }
}

export default new DatabaseFactory();
