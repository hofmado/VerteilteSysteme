"use strict";

import Page from "../page.js";
import HtmlTemplate from "./GraphenPage.html";

export default class GraphenPage extends Page {
    /**
     * Konstruktor.
     * @param {App} app Instanz der App-Klasse
     */
    constructor(app) {
        super(app, HtmlTemplate);
    }
    async init() {
        await super.init();
        this._title = "GraphenPage";
        let user_id = "6420557cd5033a24fc6777aa";     //von const zu let geändert und hardcode wert anstelle von null eingefügt 
        // Fetch the manifest file
        function getUser_id() {
            return fetch(window.navigator.userAgent.includes("Edge") ? "/manifest.json" : "/manifest.webmanifest")
            .then(response => response.json())
            .then(data => {
                let userId = data.user_id;        //von const zu let geändert
                // Do something with the data
                return userId;
            });
        }
        getUser_id().then(userId => {
            user_id = userId;
        });
        //Obejkte hier mit QuerrySelevtor ausstatten 
        const feldGraphen = this._mainElement.querySelector('#Graphengraph'); //QuerryÜberprüfen 
        const jahrJahr = 1998; 
        const werbWerb = 2000
        //Methode für die Get-Anfrage hinzufügen 
        window.addEventListener('load', async () => this._getAnfrage());
        //Mehtode für die Post-Anfrage hinzufügen 
    }
    _getAnfrage(user_id, feldGraphen) { //TODO fehler api zu frontend
        this._app.backend.fetch("GET", `/graphen/${user_id}`)
            .then(response => {
                feldGraphen.innerHTML = "" + response.werbungskosten; //Feld aus Objekte 
            });
    }
    _postAnfrage(user_id, jahrJahr, werbWerb) {
            let dataset ={
                user_id: user_id, 
                jahr: jahrJahr, 
                werbungskosten: werbWerb
            }

            this._app.backend.fetch("POST", '/graphen', {body: dataset}).then(
                setTimeout(()=> {

                    this._getAnfrage(user_id, feldGraphen)
                }, 
                1000)
            )

    }
}