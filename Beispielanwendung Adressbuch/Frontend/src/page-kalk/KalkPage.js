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
        
        const feldUsername = this.mainElement.querySelector('#name');
        const getDataButton = this._mainElement.querySelector('#get-data');
        const saveDataButton = this._mainElement.querySelector('#save-data');
        const feldJahr = this._mainElement.querySelector('#jahr');
        const feldKosten = this._mainElement.querySelector('#kosten');
        const feldFahrtweg = this._mainElement.querySelector('#fahrtweg');
        const feldWerbungskosten = this._mainElement.querySelector('#output-werbungskosten');
        const feldOutputjahr = this.mainElement.querySelector('#output-jahr');

        const form = document.querySelector("form");

        //Buttonmethode für die GET-Anfrage
        getDataButton.addEventListener('click', () => {
            const data = { jahr: feldJahr.jahr };
            fetch('/kalk/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    feldWerbungskosten.value = data.werbungskosten;
                });
        });
        
        //Buttonmethode für die POST-Anfrage
        saveDataButton.addEventListener('click', () => {
            const data = {
                jahr: feldJahr.jahr,
                kosten: feldKosten.value,
                fahrtweg: feldFahrtweg.value,
            };

            fetch('/kalk/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                werbungskosten.innerText = data.werbungskosten;
            });
        });
          
    }
}
