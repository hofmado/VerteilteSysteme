"use strict";

import Page from "../page.js"; /* page-js bleibt?*/
import HtmlTemplate from "./pageBerechnungen.html"; /* hier page-berechnungen statt page-list.html eingefügt*/

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

        //Felder im Frontend
        
        //const endjahr = 2021
        //const nebenJ = true /*document.querySelector("#nebenJ").checked;*/
        //const gesamtE = parseDouble(document.querySelector("#gesamtE").value);

        const button = this.mainElement.querySelector("#button");
        const buttonS = this.mainElement.querySelector("#buttonS");
        
        //User ID vorerst fix vergeben, nachher aus DB holen
        //const user_id ="6420557cd5033a24fc6777aa";
        const user_id ="6420557";

        //EventListener für Buttons
        //Get
        button.addEventListener("click", () => this._getGesamtersparnisse(user_id));//, startjahr, 2023*/)); //evtl endjahr noch abfragen

        //Post
        buttonS.addEventListener("click", () => this._setGesamtersparnisse(user_id));


    }

        //Methode um alle Steuerjahre eines Users abzurufen und sie dann in einem Array zu speichern
        async _getGesamtersparnisse(user_id) {
        
            var gesamtE = 0;
            var jahr = 0;
            var startjahr = document.getElementById("sJ").value;
            var endjahr = document.getElementById("eJ").value;
            console.log(startjahr + endjahr);

        //const jahr = 2023 
        //TODO: Wie übergebe ich die Variablen Startjahr und Endjahr ans Backend?
        for(let i = startjahr; i <= endjahr; i++){
            jahr = parseInt(i);
            console.log("user_id: " + user_id + "jahr:" + jahr);
        this._app.backend.fetch("GET", `/einsparungsjahr/${user_id}/${jahr}`, jahr)
                .then(response => {
                    console.log(response)
                    gesamtE += response.einsparungen;
                }
                );
        }
        
        document.getElementById("gesamtE").innerHTML = gesamtE;
        /*  TODO: Wert in Feld darstellen
            var gesamtEFeld = this.mainElement.querySelector("#gesamtE");
            gesamtEFeld.value = gesamtE;*/

            //for-Schleife um alle angeforderten Jahre durchzugehen
            /*for(let i = startjahr; i <= endjahr; i++){
            this._app.backend.fetch("GET", `/einsparungsjahr/${user_id}/${i}`) 
                .then(response => {
                    gesamtE += response.einsparungen;}
                );
            }*/
        }

        //Methode um Gesamtersparnis abzuspeichern TODO: anpassen, User_id übergeben, openapi noch anpassen
        _setGesamtersparnisse(user_id, startjahr,gesamtE){ //TODO: Die Funktion kriegt die falschen inputs siehe Zeile 60 von Maik 
            let dataset = {
                user_id: user_id,
                jahrbeginn: parseInt(startjahr),
                jahrende: parseInt(endjahr),
                gesamteinsparungen: parseInt(gesamtE)
            }
    
            this._app.backend.fetch("POST", '/gesamteinsparungen', {body: dataset}).then(
                setTimeout(() => {
                    //whait for mongodb server
                    this._getGesamtersparnisse(user_id)
                }, 1000)
            );
        }
    }

        /*async _getSteuerjahre(user_id) {
            const response = await fetch(`/steuerjahre/${user_id}`);
            const data = await response.json();
          
            const steuerjahre = data.map(item => item.jahr);
            
            //Nun alle Steuerjahre in einer Schleife zusammenzählen
            steuerjahre.forEach(jahr => {
                gesamtE += jahr;
            });
        }*/

            /*for (let i = 0; i < steuerjahre.length; i++) {
                
                const response = await this._app.backend.fetch("GET", `/steuerjahr/${user_id}/${steuerjahre[i].value}`);
                allWerbungskosten.push(response.werbungskosten);

            //return steuerjahre;
        }*/