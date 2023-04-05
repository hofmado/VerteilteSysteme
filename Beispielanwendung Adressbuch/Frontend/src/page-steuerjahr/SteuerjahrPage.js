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
        this._title = "SteuerjahrPage";
        
        //TODO user_id durch backend zugriff einholen
        const user_id ="6420557cd5033a24fc6777aa";
        const getDataButton = this._mainElement.querySelector('#get-data');
        const saveDataButton = this._mainElement.querySelector('#save-data');
        const feldJahr = this._mainElement.querySelector('#jahr');
        const feldKosten = this._mainElement.querySelector('#kosten');
        const feldFahrtweg = this._mainElement.querySelector('#fahrtweg');
        const feldWerbungskosten = this._mainElement.querySelector('#werbungskosten');

        //Buttonmethode für die GET-Anfrage
        getDataButton.addEventListener('click', () => {
            this._app.backend.fetch("GET", `/steuerjahr/${user_id}/${feldJahr.value}`)
            .then(response => {
                feldWerbungskosten.innerHTML = "" + response.werbungskosten;
            });
        });
        
        //Buttonmethode für die POST-Anfrage
        saveDataButton.addEventListener('click', () => {
            this._app.backend.fetch("POST", `/steuerjahr/${user_id}/${feldJahr.value}/${feldKosten.value}/${feldFahrtweg.value}`)
            .then(response => {
                feldWerbungskosten.innerHTML = "" + response.werbungskosten;
            });
        });
    }
}
