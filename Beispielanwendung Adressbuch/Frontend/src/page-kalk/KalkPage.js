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
        const input1 = this._mainElement.querySelector('#input1');
        const input2 = this._mainElement.querySelector('#input2');
        const input3 = this._mainElement.querySelector('#input3');
        const input4 = this._mainElement.querySelector('#input4');
        const output1 = this._mainElement.querySelector('#output1');
        const output2 = this._mainElement.querySelector('#output2');
        const output3 = this._mainElement.querySelector('#output3');
        const output4 = this._mainElement.querySelector('#output4');

        const form = document.querySelector("form");

        
        getDataButton.addEventListener('click', () => {
        fetch('/get-data-url')
            .then(response => response.json())
            .then(data => {
                input1.value = data.value1;
                input2.value = data.value2;
                input3.value = data.value3;
                input4.value = data.value4;
            });
        });
        
        
        saveDataButton.addEventListener('click', () => {
            const data = {
                value1: input1.value,
                value2: input2.value,
                value3: input3.value,
                value4: input4.value,
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
                output1.innerText = data.value1;
                output2.innerText = data.value2;
                output3.innerText = data.value3;
                output4.innerText = data.value4;
            });
        });
          
    }
}
