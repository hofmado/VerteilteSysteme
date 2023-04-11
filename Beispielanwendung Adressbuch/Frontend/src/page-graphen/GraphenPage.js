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
        //Methode für die Get-Anfrage hinzufügen 
        window.addEventListener('load', async () => this._getAnfrage());
        //Mehtode für die Post-Anfrage hinzufügen 
    }
    _getAnfrage() {
        this._app.backend.fetch("GET", `/graphen`)
            .then(response => {
                feldGraphen.innerHTML = "" + response.Graphengraph; //Feld
            });
    }
    /*_postAnfrage() {

    }*/
}