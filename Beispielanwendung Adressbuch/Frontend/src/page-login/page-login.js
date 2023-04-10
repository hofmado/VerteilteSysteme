import Page from "../page.js";
import HtmlTemplate from "./page-login.html";

/**
 * Klasse PageLogin: Stellt die Seite zum Anlegen oder Login eines Users
 * zur Verfügung.
 */
export default class PageLogin extends Page {
    constructor(app) {
        super(app, HtmlTemplate);
        
    }
    async init() {
        // HTML-Inhalt nachladen
        await super.init();
        //this._url = '/user';
        this._title = "user";
        // Logindaten laden 
        //this._dataset = await this._app.backend.fetch("GET", this._url);
        const usernamefeld = this._mainElement.querySelector('#username');
        const passwordfeld = this._mainElement.querySelector('#password');
        //Buttons
        const loginbutton = this._mainElement.querySelector('#login')
        const submitbutton = this._mainElement.querySelector('#submit');
            // Event Handler registrieren
        loginbutton.addEventListener("click", () => this._askLogin(usernamefeld, passwordfeld));
        submitbutton.addEventListener("click", () => this._register(usernamefeld, passwordfeld));
    }
    async _askLogin(username, password ) {
        try {
            console.log("Kommst du hierhin?")
            this._app.backend.fetch("GET", `/user/${username.value}/${password.value}`)
            .then(response => {
                // Save the user ID in the session storage
                let data = response.User._id;
                sessionStorage.setItem('userId', data);
                alert("Login successful!");
                //location.hash = `/#/steuerjahr/${data}`;
            });
        } catch (ex) {
            console.error(ex);
            this._app.showException(ex);
        }
    }

    async _register(username, password) {
        // Eingegebene Werte prüfen
        username = username.value;
        password = password.value;
        let User = {
            username,
            password
        };
    
        if (!username) {
            alert("Geben Sie erst einen Usernamen ein.");
            return;
        }
    
        if (!password) {
            alert("Geben Sie erst einen Passwort ein.");
            return;
        }
        console.log(User);
        // Datensatz speichern
        try {
            this._app.backend.fetch("POST", '/user', {body: User})
            .then(response => {
                // Save the user ID in the session storage
                let data = response.User._id;
                sessionStorage.setItem('userId', data);
                alert("Login successful!");
                //location.hash = `/#/steuerjahr/${responseData.username}`;
            });
        } catch (ex) {
            this._app.showException(ex);
            return;
        }
    }
}
    