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
        const user_id = "6420557cd5033a24fc6777aa";     //von const zu let geändert und hardcode wert anstelle von null eingefügt 
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
        /*getUser_id().then(userId => {
            user_id = userId;
        });*/
        //Obejkte hier mit QuerrySelevtor ausstatten 
        const feldGraphen = this._mainElement.querySelector('#Graphengraph'); //QuerryÜberprüfen 
        const feldGraphen2 = this._mainElement.querySelector('#Graphengraph2');
        const jahrJahr = 1998; 
        const werbWerb = 2000
        //Methode für die Get-Anfrage hinzufügen 
        window.addEventListener("load",  () => 
           this._getAnfrage(user_id, feldGraphen, feldGraphen2),
           this._postAnfrage()
            //await app._getAnfrage(user_id, feldGraphen)
        );
        
        //Mehtode für die Post-Anfrage hinzufügen 
        this._getAnfrage(user_id, feldGraphen, feldGraphen2);
        this._postAnfrage(user_id); 
    }

    _getAnfrage(user_id, feldGraphen, feldGraphen2) { //TODO fehler api zu frontend
        this._app.backend.fetch("GET", `/graphen/${user_id}`)
            .then(response => {
                const platzhalter = response; 
                const middleIndex = Math.floor(platzhalter.length /2);
                feldGraphen.innerHTML = "" + platzhalter.slice(0, middleIndex); //Feld aus Objekte 
                feldGraphen2.innerHTML = "" + platzhalter.slice(middleIndex); 
            });
    }
    _postAnfrage(user_id) {
        let dataset ={
            user_id: user_id
        }
            this._app.backend.fetch("POST", '/graphen', {body: dataset}).then(

            )

    }
}