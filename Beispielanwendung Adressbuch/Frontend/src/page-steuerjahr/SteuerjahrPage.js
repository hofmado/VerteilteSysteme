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
        
        const getDataButton = this._mainElement.querySelector('#get-data');
        const saveDataButton = this._mainElement.querySelector('#save-data');
        const feldJahr = this._mainElement.querySelector('#jahr');
        const feldKosten = this._mainElement.querySelector('#kosten');
        const feldFahrtweg = this._mainElement.querySelector('#fahrtweg');
        const feldWerbungskosten = this._mainElement.querySelector('#werbungskosten');

        //Buttonmethode für die GET-Anfrage
        getDataButton.addEventListener('click', () => {
            const data = { jahr: feldJahr.value };
            fetch('/user/steuerjahr/', {
                method: 'GET',
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
        
        //Buttonmethode für die POST-Anfrage
        saveDataButton.addEventListener('click', () => {
            const data = {
                jahr: feldJahr.value,
                kosten: feldKosten.value,
                fahrtweg: feldFahrtweg.value,
                werbungskosten: "",
            };

            fetch('/user/steuerjahr/', {
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
