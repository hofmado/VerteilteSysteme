"use strict";

import Page from "../page.js"; /* page-js bleibt?*/
import HtmlTemplate from "./page-berechnungen.html"; /* hier page-berechnungen statt page-list.html eingefügt*/

/**
 * Klasse PageList: Stellt die Listenübersicht zur Verfügung
 */
export default class PageList extends Page {
    /**
     * Konstruktor.
     *
     * @param {App} app Instanz der App-Klasse
     */
    constructor(app) {
        super(app, HtmlTemplate);

        this._emptyMessageElement = null;
    }

    /**
     * HTML-Inhalt und anzuzeigende Daten laden.
     *
     * HINWEIS: Durch die geerbte init()-Methode wird `this._mainElement` mit
     * dem <main>-Element aus der nachgeladenen HTML-Datei versorgt. Dieses
     * Element wird dann auch von der App-Klasse verwendet, um die Seite
     * anzuzeigen. Hier muss daher einfach mit den üblichen DOM-Methoden
     * `this._mainElement` nachbearbeitet werden, um die angezeigten Inhalte
     * zu beeinflussen.
     */
    async init() {
        // HTML-Inhalt nachladen
        await super.init();
        this._title = "berechnungen";

        //// TODO: Anzuzeigende Inhalte laden mit this._app.backend.fetch() ////
        this._app.backend.fetch()
        //// TODO: Inhalte in die HTML-Struktur einarbeiten ////
        //// TODO: Neue Methoden für Event Handler anlegen und hier registrieren ////
    }
};