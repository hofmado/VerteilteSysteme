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
        //// TODO: Methode anpassen, um zur eigenen App passende Demodaten anzulegen ////
        //// oder die Methode ggf. einfach löschen und ihren Aufruf oben entfernen.  ////
        /*let user = this.database.collection("user");
        let steuerjahr = this.database.collection("steuerjahr");*/

        if (await user.estimatedDocumentCount() === 0) {
            user.insertMany([
                {
                    user_name: "Max",
                    password: "1",
                    gesamt_steuer: "6000",
                    semester_anzahl: "4",
                    steuerjahr: {
                        jahr: "2022",
                        steuerablassungen: "2500",
                    },
                    steuerjahr: {
                        jahr: "2021",
                        steuerablassungen: "3500",
                    },
                },
            ]);
        }     
    }

    //Methode um Steuerjahre bzw. Semester zusammenzuzählen und zu übergeben
    async _getSteuerjahre() {
        let user = this.database.collection("user");
        let steuerjahr = this.database.collection("steuerjahr");
        let gesamtersparnis = 0;

        if (await user.semester_anzahl === 0) {
            //Tu nichts, da keine Semester eingetragen wurden
            ;         
        }
        
        else {
            //Daten holen
            user.forEach(user.steuerjahr() {
               gesamtersparnis += steuerjahr.steuerablassungen; //Was ist hier falsch?
            });

            //Gesamtersparnis in DB festhalten
            user.insert() //Hier Gesamtersparnis füllen
            return gesamtersparnis;

        }
    }

    //Methode um zu prüfen ob Nebenjob stattgefunden hat
    async _getNebenjob() {
        if (await user.nebenjob === false) {
            //Tu nichts, da kein Nebenjob eingetragen wurden
            ;         
        }
        
        else {
            //Daten holen
            return user._getNebenjob();
        }
    }

}

export default new DatabaseFactory();
