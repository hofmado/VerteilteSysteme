"use strict";

import Page from "../page.js";
import HtmlTemplate from "./page-login.html";

/**
 * Klasse PageLogin: Stellt die Seite zum Anlegen oder Login eines Users
 * zur Verfügung.
 */
export default class PageLogin extends Page {
    constructor(app) {
        super(app, HtmlTemplate);

        this.username = null;
        this.password = null;
        
    }
    async init() {
        // HTML-Inhalt nachladen
        await super.init();
        this._url = '/login';
        this._title = "Login";
        // Logindaten laden 
        this._url = `/address/${this._editId}`;
        this._dataset = await this._app.backend.fetch("GET", this._url);

        //Buttons
        const loginbutton = document.getElementById("login");
        const submitbutton = document.getElementById("submit");
            // Event Handler registrieren
        loginbutton.addEventListener("click", () => this._askLogin());
        submitbutton.addEventListener("click", () => this._register());
    }
    async _askLogin() {
        try { // add try-catch block for error handling
            const usernamefeld = document.getElementById("username");
            const passwordfeld = document.getElementById("password");
            
            const user = { username: usernamefeld.value }; // fix syntax error here
            
            const response = await fetch(`/user/${user.username}`, { // modify endpoint to include username
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) { // check if response status is not ok
                throw new Error('Failed to retrieve user data');
            }
            
            const userData = await response.json();
            const password2 = userData.password; // fix syntax error here
            
            if (password2 === passwordfeld.value) {
                alert("Login successful!");
                location.hash = `/#/address/${userData._id}`; // modify destination URL to match dataset ID
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
        const data = {
            username: usernamefeld.value,
            kosten: passwordfeld.value,
        };
        if (!this._dataset.username) {
            alert("Geben Sie erst einen Usernamen ein.");
            return;
        }

        if (!this._dataset.password) {
            alert("Geben Sie erst einen Passwort ein.");
            return;
        }
        // Datensatz speichern
        try {
            fetch('/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json());

        } catch (ex) {
            this._app.showException(ex);
            return;
        }

        // weiterleitung zum Datasheet
        location.hash = "#/";
    }
}
    