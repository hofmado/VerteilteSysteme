import DatabaseFactory from "../database.js";
import {CURSOR_FLAGS, ObjectId} from "mongodb";

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
  async readSteuerjahr(user_id, jahr) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    let result = await this._steuerjahr.findOne({user_id: user_id, jahr: jahr});
    return result;
  }

  async createSteuerjahr() {
      // Get input values
      const kosten = parseInt(document.getElementById("kosten").value);
      const fahrtweg = parseInt(document.getElementById("fahrtweg").value);

      // Calculate tax savings
      const fahrtkosten = fahrtweg * 0.3*225;
      const newWerbungskosten = fahrtkosten + kosten ;
      //TODO: user_id durch korrekten backendZugriff austauschen
      const user_id = "6420557cd5033a24fc6777aa";
    
      let newSteuerJahr = {
        user_id:            steuerjahr.user_id        || user_id,
        jahr:               steuerjahr.jahr           || document.getElementById("jahr").value,
        werbungskosten:     steuerjahr.werbungskosten || newWerbungskosten.toFixed(2),
      };

    // Display tax savings
      document.getElementById("werbungskosten").innerHTML = newWerbungskosten.toFixed(2);
        let result = await this._steuerjahr.insertOne(newSteuerJahr);
        return await this._steuerjahr.findOne({_id: result.insertedId});
  }
}