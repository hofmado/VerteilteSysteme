"use strict";

import Page from "../page.js"; /* page-js bleibt?*/
import HtmlTemplate from "./page-berechnungen.html"; /* hier page-berechnungen statt page-list.html eingefügt*/

/**
 * Klasse PageList: Stellt die Listenübersicht zur Verfügung
 */
export default class PageBerechnungen extends Page {
    /**
     * Konstruktor.
     *
     * @param {App} app Instanz der App-Klasse
     */
    constructor(app) {
        super(app, HtmlTemplate);

        this._emptyMessageElement = null;
    }

    /**
     * HTML-Inhalt und anzuzeigende Daten laden.
     *
     * HINWEIS: Durch die geerbte init()-Methode wird `this._mainElement` mit
     * dem <main>-Element aus der nachgeladenen HTML-Datei versorgt. Dieses
     * Element wird dann auch von der App-Klasse verwendet, um die Seite
     * anzuzeigen. Hier muss daher einfach mit den üblichen DOM-Methoden
     * `this._mainElement` nachbearbeitet werden, um die angezeigten Inhalte
     * zu beeinflussen.
     */
          
    async init() {
        // HTML-Inhalt nachladen
        await super.init();
        this._title = "berechnungen";

        //User ID vorerst fix vergeben, nachher aus DB holen
        const user_id ="6420557cd5033a24fc6777aa";

        //Felder im Frontend
        const anzS = parseInt(document.querySelector("#anzS").value);
        const nebenJ = document.querySelector("#nebenJ").checked;
        //const gesamtE = parseDouble(document.querySelector("#gesamtE").value);
        let gesamtE = 0;

        const button = this.mainElement.querySelector("#button");
        const buttonS = this.mainElement.querySelector("#buttonS");


        //EventListener für Buttons
        //Get
        button.addEventListener("click", () => this._getSteuerjahre(user_id));
            
        }

        //Post
        /*buttonS.addEventListener("click", () => {
            ;
        }*/

        //Methode um alle Steuerjahre eines Users abzurufen und sie dann in einem Array zu speichern
        async _getSteuerjahre(user_id) {
            const response = await fetch(`/steuerjahre/${user_id}`);
            const data = await response.json();
          
            const steuerjahre = data.map(item => item.jahr);
            
            //Nun alle Steuerjahre in einer Schleife zusammenzählen
            steuerjahre.forEach(jahr => {
                gesamtE += jahr;
            });
        }

            /*for (let i = 0; i < steuerjahre.length; i++) {
                
                const response = await this._app.backend.fetch("GET", `/steuerjahr/${user_id}/${steuerjahre[i].value}`);
                allWerbungskosten.push(response.werbungskosten);*/

            //return steuerjahre;
        }

        _/*getAllSteuerjahre(user_id) {

            this._app.backend.fetch("GET", `/steuerjahr/${user_id}')
            .then(response => {

                //Schleife um alle Steuerjahre zusammenzurechnen
                forEach

                feldWerbungskosten.innerHTML = "" + response.werbungskosten;
            });
    }*/

            /*
            const allWerbungskosten = [];
            const allSteuerjahre = document.querySelectorAll(".steuerjahr");
          
            for (let i = 0; i < allSteuerjahre.length; i++) {
              const response = await this._app.backend.fetch("GET", `/steuerjahr/${user_id}/${allSteuerjahre[i].value}`);
              allWerbungskosten.push(response.werbungskosten);
            }*/
          
            /*const gesamtWerbungskosten = allWerbungskosten.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            return gesamtWerbungskosten;
          }*/



        //this._dataset = await this._app.backend.fetch("GET", this._url); Wird nachher benötigt

        //Hier Buttons nennen
        //Buttons
        //const berechnenbutton = this._mainElement.querySelector('#button');
        //const submitbutton = this._mainElement.querySelector('#submit');
            // Event Handler registrieren
        //berechnenbutton.addEventListener("click", () => this._gotoBerechnungen());
        //// TODO: Anzuzeigende Inhalte laden mit this._app.backend.fetch() ////
        //submitbutton.addEventListener("click", () => this._register());
        //// TODO: Inhalte in die HTML-Struktur einarbeiten ////
        //// TODO: Neue Methoden für Event Handler anlegen und hier registrieren ////
        


