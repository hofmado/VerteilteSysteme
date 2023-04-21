"use strict";

import Page from "../page.js";
import HtmlTemplate from "./pageBerechnungen.html";

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
        this._title = "einsparungsjahr";

        // Platzhalter anzeigen, wenn noch keine Daten vorhanden sind
        let data = await this._app.backend.fetch("GET", "/");
        this._emptyMessageElement = this._mainElement.querySelector(".empty-placeholder");

        const button = this.mainElement.querySelector("#button");
        const buttonS = this.mainElement.querySelector("#buttonS");
        
        //User ID vorerst fix vergeben, nachher aus DB holen
        //const user_id ="6420557cd5033a24fc6777aa";
        const user_id ="6420557";

        //EventListener für Buttons
        //Get
        button.addEventListener("click", () => this._getGesamtersparnisse(user_id));

        //Post
        buttonS.addEventListener("click", () => this._setGesamtersparnisse(user_id));
    }

        //Methode um alle Steuerjahre eines Users abzurufen und sie dann in einem Array zu speichern
        async _getGesamtersparnisse(user_id) {

            //Variablen befüllen
            var gesamtE = 0;
            var startjahr = document.getElementById("sJ").value;
            var endjahr = document.getElementById("eJ").value;
            console.log(startjahr + endjahr);

            //Sicherstellen dass startjahr kleiner oder gleich endjahr ist
            if(startjahr > endjahr){

                var x = startjahr;
                startjahr = endjahr;
                endjahr = x;
            }

        var jahr = 0;
        for(let i = startjahr; i <= endjahr; i++){
            jahr = parseInt(i);
            console.log("user_id: " + user_id + "jahr:" + jahr);
            this._app.backend.fetch("GET", `/einsparungsjahr/${user_id}/${jahr}`)
                .then(response => {
                    console.log(response)
                    gesamtE += response.einsparungen;
                }
                );
        }
        document.getElementById("gesamtE").innerHTML = gesamtE;
    }
        
        //Methode um Gesamtersparnis abzuspeichern
        _setGesamtersparnisse(user_id){
            let dataset = {
                user_id: user_id,
                jahrbeginn: parseInt(startjahr),
                jahrende: parseInt(endjahr),
                gesamteinsparungen: parseInt(gesamtE)
            }
    
            this._app.backend.fetch("POST", '/gesamteinsparungen', {body: dataset}).then(
                setTimeout(() => {
                    //wait for mongodb server
                    this._getGesamtersparnisse(user_id)
                }, 1000)
            );
        }
    }