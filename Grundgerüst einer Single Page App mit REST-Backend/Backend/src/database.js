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
        this.database = this.client.db("app_database");

        await this._createDemoData();
    }


    async createNewSteuerjahr(email) {
        let newSteuerJahr = {
            steuerjahr:     email.steuerjahr     || "",
            werbungskosten: email.werbungskosten || "",
            fahrtkosten:    email.fahrtkosten    || "",
            absetzbarerbetrag: email.absetzbarerBetrag || "",
        };
    }
    /**
     * Hilfsmethode zum Anlegen von Demodaten. Würde man so in einer
     * Produktivanwendung natürlich nicht machen, aber so sehen wir
     * wenigstens gleich ein paar Daten.
     */
    async _createDemoData() {
        //// TODO: Methode anpassen, um zur eigenen App passende Demodaten anzulegen ////
        //// oder die Methode ggf. einfach löschen und ihren Aufruf oben entfernen.  ////
        let examples = this.database.collection("example");

        if (await examples.estimatedDocumentCount() === 0) {
            examples.insertMany([
                {
                    email: "MaxMüller",
                    passwort: "123456789",
                    jahr: "2020",
                    werbungskosten: "1500",
                    fahrtkosten: "250",
                    absetzbarerBetrag: "1750",
                },
                {
                    email: "DominikHoffmann",
                    passwort: "0123456789",
                    jahr: "2020",
                    werbungskosten: "1600",
                    fahrtkosten: "350",
                    absetzbarerBetrag: "1950",
                },
            ]);
        }
    }

}

export default new DatabaseFactory();
