import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";

export default class kalk_service {

  constructor() {
    this._kalk = DatabaseFactory.database.collection("steuerjahr");
  }


  /**
   * Songs suchen. Über den Query-Parameter `search` können alle Felder der
   * Songs mit einem RegEx durchsucht werden. Alternativ können einzelne Felder
   * mitgegeben werden, die auf exakte Übereinstimmung geprüft werden.
   *
   * @param {Object} query Optionale Suchparameter
   * @return {Promise} Liste der gefundenen Adressen
   */
  async read(name, jahr) {
    let steuerjahrDoc = await steuerjahr.findOne({name: name, jahr: jahr});
    return steuerjahrDoc;
  }

  /**
   * Speichern einen neuen Songs.
   *
   * @param {Object} steuerjahr Zu speichernder Song
   * @return {Promise} Gespeichertes Song
   */
  async createSteuerjahr(steuerjahr) {
      if(steuerjahr == null) return;

      let newSteuerJahr = {
        jahr:               jahr           || "",
        werbungskosten:     werbungskosten || "",
      };

      // Get input values
      let kosten = parseInt(document.getElementById("kosten").value);
      let fahrtweg = parseInt(document.getElementById("fahrtweg").value);
      let jahr = parseInt(document.getElementById("jahr").vakue);

      // Calculate tax savings
      let fahrtkosten = fahrtweg * 0.3;
      let werbungskosten = fahrtkosten + kosten ;
  
    // Display tax savings
      document.getElementById("output-werbungskosten").innerHTML = absetzbarerbetrag.toFixed(2);
      document.getElementById("output-jahr").innerHTML = jahr.toFixed(0);
        let result = await this._steuerjahr.insertOne(newSteuerJahr);
        return await this._steuerjahr.findOne({_id: result.insertedId});
  }

  /**
   * Auslesen eines vorhandenen Songs anhand seiner ID.
   *
   * @param {String} email ID des gesuchten Songs
   * @param {String} steuerjahr 
   * @return {Promise} Gefundener Song
   */
  async read(steuerjahr) {
      //TO-DO: anzeige Parameter erstellen
  }
}