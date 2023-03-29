import DatabaseFactory from "../database.js";
import {CURSOR_FLAGS, ObjectId} from "mongodb";

export default class steuerjahr_service {

  constructor() {
    this._steuerjahr = DatabaseFactory.database.collection("Steuerjahr");
  }
/**
   * Speichern eines neuen Steuerjahrs.
   *
   * @param {Object} jahr Zu gespeichertem Steuerjahr
   * @return {Promise} zu gespeichertes Steuerjahr
   */
  async read(query) {
    let cursor = await this._steuerjahr.findOne(query, {
      sort: {
        jahr:1,
      }
    });
    return cursor.toArray();
  }

  /**
   * Speichern eines neuen Steuerjahrs.
   *
   * @param {Object} user Zu speichernder Steuerjahr an User
   * @return {Promise} zu speicherndes Stuerjahr an User
   */
  async create(user) {
      if(user == null) return;

      // Get input values
      const kosten = parseInt(document.getElementById("kosten").value);
      const fahrtweg = parseInt(document.getElementById("fahrtweg").value);

      // Calculate tax savings
      const fahrtkosten = fahrtweg * 0.3;
      const newWerbungskosten = fahrtkosten + kosten ;
    
      let newSteuerJahr = {
        jahr:               user.steuerjahr.jahr           || parseInt(document.getElementById("jahr").value),
        werbungskosten:     user.steuerjahr.werbungskosten || newWerbungskosten,
      };

    // Display tax savings
      document.getElementById("werbungskosten").innerHTML = absetzbarerbetrag.toFixed(2);
      document.getElementById("jahr").innerHTML = jahr.toFixed(0);
        let result = await this._steuerjahr.insertOne(newSteuerJahr);
        return await this._steuerjahr.findOne({_id: result.insertedId});
  }
}