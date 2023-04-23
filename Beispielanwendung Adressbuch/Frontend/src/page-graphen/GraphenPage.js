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
        const user_id = "";     //hardcode 6420557cd5033a24fc6777aa zum testen des einzelnen services 
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
        getUser_id().then(userId => { //getUser_id() auskommentieren, um den einzelnen service zu testen 
            user_id = userId;
        });
        
        //Obejkte hier mit QuerrySelevtor ausstatten 
        const feldGraphen = this._mainElement.querySelector('#Graphengraph'); //QuerryÜberprüfen 
        const feldGraphen2 = this._mainElement.querySelector('#Graphengraph2');

         
        //Methode für die Get-Anfrage hinzufügen
        this._getAnfrage(user_id, feldGraphen, feldGraphen2);
        //Mehtode für die Post-Anfrage hinzufügen 
        this._postAnfrage(user_id); 
    }

    _getAnfrage(user_id, feldGraphen, feldGraphen2) { 
        this._app.backend.fetch("GET", `/graphen/${user_id}`)
            .then(response => {
                const platzhalter = response; 
                const middleIndex = Math.floor(platzhalter.length /2);
                const ArrayX =  platzhalter.slice(0, middleIndex); //ArrayX für Graphen.js
                const ArrayY = platzhalter.slice(middleIndex);  //ArrayY für Graphen.js
                //Hier stände der Charts.js-Code, wenn die Implementation funktioniert hätte
                feldGraphen.innerHTML = "" + ArrayX; 
                feldGraphen2.innerHTML = "" + ArrayY;
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