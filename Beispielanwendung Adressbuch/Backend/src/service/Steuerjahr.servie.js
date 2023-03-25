import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";

export default class steuerjahr_service {

  constructor() {
    this._steuerjahr = DatabaseFactory.database.collection("steuerjahr");
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
   * @param {Object} user Zu speichernder Steuerjahr an User
   * @return {Promise} zu speicherndes Stuerjahr an User
   */
  async create(user) {
      if(user == null) return;

      let newSteuerJahr = {
        jahr:               jahr           || "",
        werbungskosten:     werbungskosten || "",
      };

      // Get input values
      const kosten = parseInt(document.getElementById("kosten").value);
      const fahrtweg = parseInt(document.getElementById("fahrtweg").value);
      jahr = parseInt(document.getElementById("jahr").value);

      // Calculate tax savings
      const fahrtkosten = fahrtweg * 0.3;
      werbungskosten = fahrtkosten + kosten ;
  
    // Display tax savings
      document.getElementById("werbungskosten").innerHTML = absetzbarerbetrag.toFixed(2);
      document.getElementById("jahr").innerHTML = jahr.toFixed(0);
        let result = await this._steuerjahr.insertOne(newSteuerJahr);
        return await this._steuerjahr.findOne({_id: result.insertedId});
  }
}