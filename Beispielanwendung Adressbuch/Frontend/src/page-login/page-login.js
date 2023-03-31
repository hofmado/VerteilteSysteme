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

        //Buttons
        const loginbutton = this._mainElement.querySelector('#login')
        const submitbutton = this._mainElement.querySelector('#submit');
            // Event Handler registrieren
        loginbutton.addEventListener("click", () => this._askLogin());
        submitbutton.addEventListener("click", () => this._register());
    }
    async _askLogin() {
        try {
            const usernamefeld = document.getElementById("username");
            const passwordfeld = document.getElementById("password");
            // Set username and password properties
            this.username = usernamefeld.value;
            this.password = passwordfeld.value;

            const response = await fetch(`/user/${this.username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to retrieve user data');
            }

            const userData = await response.json();
            const _password = userData.password;

            if (_password === this.password) {
                alert("Login successful!");
                location.hash = `/#/steuerjahr/${userData.username}`;
            } else {
                alert("Invalid username or password!");
                usernamefeld.value = null;
                passwordfeld.value = null;
            }
        } catch (ex) {
            console.error(ex);
            this._app.showException(ex);
        }
    }

    async _register() {
        // Eingegebene Werte prüfen
        const usernamefeld = document.getElementById("username");
        const passwordfeld = document.getElementById("password");
    
        const data = {
            username: usernamefeld.value,
            password: passwordfeld.value,
        };
    
        if (!data.username) {
            alert("Geben Sie erst einen Usernamen ein.");
            return;
        }
    
        if (!data.password) {
            alert("Geben Sie erst einen Passwort ein.");
            return;
        }
    
        // Datensatz speichern
        try {
            const response = await fetch('/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error('Failed to save user data');
            }
    
            const responseData = await response.json();
            alert("Registration successful!");
            location.hash = `/#/steuerjahr/${responseData.username}`;
        } catch (ex) {
            this._app.showException(ex);
            return;
        }
    }
}
    