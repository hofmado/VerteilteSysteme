import Page from "../page.js";
import HtmlTemplate from "./KalkPage.html";

export default class KalkPage extends Page {
    /**
     * Konstruktor.
     * @param {App} app Instanz der App-Klasse
     */
    constructor(app) {
        super(app, HtmlTemplate);
    }

    async init() {
        await super.init();
        this._title = "Kalkpage";
        
        
        const getDataButton = this._mainElement.querySelector('#get-data');
        const saveDataButton = this._mainElement.querySelector('#save-data');
        const feldJahr = this._mainElement.querySelector('#feldJahr');
        const feldWerbungskosten = this._mainElement.querySelector('#FeldWerbungskosten');
        const feldFahrtweg = this._mainElement.querySelector('#feldFahrtweg');
        const feldSteuerablassung = this._mainElement.querySelector('#feldSteuerablassung');

        const form = document.querySelector("form");

        //Buttonmethode für die GET-Anfrage
        getDataButton.addEventListener('click', () => {
        fetch('/steuerjahr/')
            .then(response => response.json())
            .then(data => {
                feldSteuerablassung.value = data.steuerablassung;
            });
        });
        
        //Buttonmethode für die PUT-Anfrage
        saveDataButton.addEventListener('click', () => {
            const data = {
                jahr: feldJahr.jahr,
                werbungskosten: feldWerbungskosten.value,
                fahrtweg: feldFahrtweg.value,
            };

            fetch('/save-data-url', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                steuerablassung.innerText = data.steuerablassung;
            });
        });
          
    }
}
