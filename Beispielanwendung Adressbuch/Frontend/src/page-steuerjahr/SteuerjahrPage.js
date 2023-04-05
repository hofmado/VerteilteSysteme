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
            this._app.backend.fetch("GET", `/steuerjahr/${this.user_id}/${feldJahr.value}`).then();
            /*
            fetch('/steuerjahr', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "jahr": feldJahr.value,
                    "user_id": user_id
                }
            })
                .then(response => response.json())
                .then(data => {
                    feldWerbungskosten.innerHTML = data.werbungskosten;
                    console.log(data.werbungskosten);
                });*/
        });
        
        //Buttonmethode für die POST-Anfrage
        saveDataButton.addEventListener('click', () => {
            const data = {
                jahr: feldJahr.value,
                kosten: feldKosten.value,
                fahrtweg: feldFahrtweg.value,
                werbungskosten: 0,
            };

            fetch('/steuerjahr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                feldWerbungskosten.innerHTML = data.werbungskosten;
            });
        });
    }
}
