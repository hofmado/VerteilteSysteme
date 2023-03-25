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
