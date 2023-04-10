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
        this._title = "berechnungen";

        //User ID vorerst fix vergeben, nachher aus DB holen
        const user_id ="6420557cd5033a24fc6777aa";

        //Felder im Frontend
        const startjahr = 2020 /*= parseInt(document.querySelector("#anzJ").value);*/
        const endjahr = 2021
        const nebenJ = true /*document.querySelector("#nebenJ").checked;*/
        //const gesamtE = parseDouble(document.querySelector("#gesamtE").value);

        const button = this.mainElement.querySelector("#button");
        const buttonS = this.mainElement.querySelector("#buttonS");
        


        //EventListener für Buttons
        //Get
        button.addEventListener("click", () => this._getGesamtkosten(user_id, startjahr, 2023)); //evtl endjahr noch abfragen

        //Post
        buttonS.addEventListener("click", () => this.setGesamtkosten(user_id));
    }

        //Methode um alle Steuerjahre eines Users abzurufen und sie dann in einem Array zu speichern
        async _getGesamtkosten(user_id, startjahr, endjahr) {

            let gesamtE = 0;
            this._app.backend.fetch("GET", `/einsparungsjahr/${user_id}/${2021}`) 
                .then(response => {
                    gesamtE = response.einsparungen;}
                );
            
            var gesamtEFeld = this.mainElement.querySelector("#gesamtE");
            gesamtEFeld.value = gesamtE;

            //for-Schleife um alle angeforderten Jahre durchzugehen
            /*for(let i = startjahr; i <= endjahr; i++){
            this._app.backend.fetch("GET", `/einsparungsjahr/${user_id}/${i}`) 
                .then(response => {
                    gesamtE += response.einsparungen;}
                );
            }*/
        }

        //Methode um Gesamtersparnis abzuspeichern TODO: anpassen, User_id übergeben, openapi noch anpassen
        _setGesamtkosten(user_id){/*
            let dataset = {
                user_id: user_id, 
                werbungskosten: gesamtE
            }
    
            this._app.backend.fetch("POST", '/steuerjahr', {body: dataset}).then(//TODO nennen wie collection element in API
                setTimeout(() => {
                    //whait for mongodb server
                    //this._getAnfrage(user_id,feldJahr,feldWerbungskosten)
                }, 1000)
            )*/;
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