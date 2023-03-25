import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";

export default class steuerjahr_service {

  constructor() {
    this._kalk = DatabaseFactory.database.collection("steuerjahr");
  }
/**
   * Speichern eines neuen Steuerjahrs.
   *
   * @param {Object} jahr Zu gespeichertem Steuerjahr
   * @return {Promise} zu gespeichertes Steuerjahr
   */
  async read(jahr) {
    let steuerjahrDoc = await steuerjahr.findOne({jahr: jahr, werbungskosten: werbungskosten});
    return steuerjahrDoc;
  }

  /**
   * Speichern eines neuen Steuerjahrs.
   *
   * @param {Object} steuerjahr Zu speichernder Song
   * @return {Promise} Gespeichertes Song
   */
  async create(steuerjahr) {
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
      document.getElementById("jahr").innerHTML = jahr.toFixed(0);
        let result = await this._steuerjahr.insertOne(newSteuerJahr);
        return await this._steuerjahr.findOne({_id: result.insertedId});
  }
}