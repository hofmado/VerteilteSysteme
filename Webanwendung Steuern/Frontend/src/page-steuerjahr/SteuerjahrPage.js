"use strict";

import Page from "../page.js";
import HtmlTemplate from "./SteuerjahrPage.html";

export default class SteuerjahrPage extends Page {
    /**
     * Konstruktor.
     * @param {App} app Instanz der App-Klasse
     */
    constructor(app) {
        super(app, HtmlTemplate);
    }

    async init() {
        await super.init();
        this._title = "Steuerjahr";
        let user_id = sessionStorage.getItem('userId');
        // Fetch the manifest file
        const getDataButton = this._mainElement.querySelector('#get-data');
        const saveDataButton = this._mainElement.querySelector('#save-data');
        const feldJahr = this._mainElement.querySelector('#jahr');
        const feldKosten = this._mainElement.querySelector('#kosten');
        const feldFahrtweg = this._mainElement.querySelector('#fahrtweg');
        const feldWerbungskosten = this._mainElement.querySelector('#werbungskosten');

        //Buttonmethode für die GET-Anfrage
        getDataButton.addEventListener('click', () => this._getAnfrage(user_id, feldJahr, feldWerbungskosten));
        
        //Buttonmethode für die POST-Anfrage
        saveDataButton.addEventListener('click', () => this._postAnfrage(user_id, feldJahr, feldKosten, feldFahrtweg, feldWerbungskosten));
    }

    _getAnfrage(user_id, feldJahr, feldWerbungskosten) {
        this._app.backend.fetch("GET", `/steuerjahr/${user_id}/${feldJahr.value}`)
            .then(response => {
                feldWerbungskosten.innerHTML = "" + response.werbungskosten;
            });
    }

    _postAnfrage(user_id, feldJahr, feldKosten, feldFahrtweg, feldWerbungskosten) {
        let dataset = {
            user_id: user_id, 
            jahr: parseInt(feldJahr.value),
            kosten: parseInt(feldKosten.value),
            fahrtweg: parseInt(feldFahrtweg.value)
        }

        this._app.backend.fetch("POST", '/steuerjahr', {body: dataset}).then(
            setTimeout(() => {
                //whait for mongodb server
                this._getAnfrage(user_id,feldJahr,feldWerbungskosten)
            }, 
            //hier wartet die funktion auf den Eintrag in die MongoDB (dies dauert etwa 0,1 bis 0,8 sek)
            1000)
        )
        
    }
}
