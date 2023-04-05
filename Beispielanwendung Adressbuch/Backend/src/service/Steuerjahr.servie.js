import DatabaseFactory from "../database.js";
import {CURSOR_FLAGS, Int32, ObjectId} from "mongodb";

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
    let result = await this._steuerjahr.findOne({user_id: user_id, jahr: parseInt(jahr)});
    return result;
  }

  async createSteuerjahr(user_id, jahr, kosten, fahrtweg) {
    // Calculate tax savings
    const fahrtkosten = fahrtweg * 0.3*225;
    const newWerbungskosten = fahrtkosten + kosten ;
    //TODO: user_id durch korrekten backendZugriff austauschen
  
    let newSteuerJahr = {
      user_id:            steuerjahr.user_id        || user_id,
      jahr:               steuerjahr.jahr           || jahr,
      werbungskosten:     steuerjahr.werbungskosten || newWerbungskosten.toFixed(2),
    };

    // Display tax savings
    let result = await this._steuerjahr.insertOne(newSteuerJahr);
    return await this._steuerjahr.findOne({_id: result._id});
  }
}