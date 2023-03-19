"use strict";

import Page from "../page.js";
import HtmlTemplate from "./page-login.html";

/**
 * Klasse PageLogin: Stellt die Seite zum Anlegen oder Bearbeiten einer Adresse
 * zur Verfügung.
 */
export default class PageLogin extends Page {

    async init() {
        // HTML-Inhalt nachladen
        await super.init();
        this._title = "Login";

        this.username = null;
        this.password = null;
        
            // Event Handler registrieren
            liElement.querySelector(".action.edit").addEventListener("click", () => location.hash = `#/edit/${dataset._id}`);
            liElement.querySelector(".action.delete").addEventListener("click", () => this._askDelete(dataset._id));
        }
    }

    