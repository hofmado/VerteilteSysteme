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
        
    }
    async init() {
        // HTML-Inhalt nachladen
        await super.init();
        this._title = "Login";
        
        this.username = null;
        this.password = null;
        this.submitbutton = document.getElementById("submit");
            // Event Handler registrieren
            this.submitbutton.addEventListener("click", () => this._askLogin(dataset._id));
        }
        async _askLogin(id) {
            fetch('/login',{
                method: 'POST',
                headers
            })
        }
    }

    