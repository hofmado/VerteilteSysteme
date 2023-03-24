"use strict";

import Page from "../page.js";
import HtmlTemplate from "./page-login.html";

/**
 * Klasse PageLogin: Stellt die Seite zum Anlegen oder Bearbeiten einer Adresse
 * zur Verfügung.
 */
export default class PageLogin extends Page {
    constructor(app, editId) {
        super(app, HtmlTemplate);

        this.username = null;
        this.password = null;
        
    }
    async init() {
        // HTML-Inhalt nachladen
        await super.init();
        this._url = '/login'
        this._title = "Login";
        // Logindaten laden 
        this._url = `/address/${this._editId}`;
        this._dataset = await this._app.backend.fetch("GET", this._url);

        
        let loginbutton = document.getElementById("login");
        let submitbutton = document.getElementById("submit");
            // Event Handler registrieren
        loginbutton.addEventListener("click", () => this._askLogin());
        submitbutton.addEventListener("click", () => this._register());
        }
        async _askLogin() {
            this._dataset._id        = this._editId;
            this._dataset.username = this._firstNameInput.value.trim();
            this._dataset.password  = this._lastNameInput.value.trim();
    
            if (!this._dataset.username) {
                alert("Geben Sie erst einen Usernamen ein.");
                return;
            }
    
            if (!this._dataset.password) {
                alert("Geben Sie erst einen Passwort ein.");
                return;
            }
              
        }
    }
    async _register() {
        // Eingegebene Werte prüfen
        this._dataset._id        = this._editId;
        this._dataset.username = this._firstNameInput.value.trim();
        this._dataset.password  = this._lastNameInput.value.trim();

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
                await this._app.backend.fetch("POST", this._url, {body: this._dataset});

        } catch (ex) {
            this._app.showException(ex);
            return;
        }

        // weiterleitung zum Datasheet
        location.hash = "#/";
    }
};


    