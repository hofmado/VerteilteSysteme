import DatabaseFactory from "../database.js";
import {CURSOR_FLAGS, Int32, ObjectId} from "mongodb";

export default class berechnungen_service {

  constructor() {
    this._einsparungen = DatabaseFactory.database.collection("steuerjahr"); //TODO eigene collection erstellen
  }
/**
   * Speichern eines neuen Steuerjahrs.
   *
   * @param {Object} jahr Zu gespeichertem Steuerjahr
   * @return {Promise} zu gespeichertes Steuerjahr
   */
  async readSteuerjahr(user_id, jahr) { //TODO nennen wie collection element in API
    let result = await this._steuerjahr.findOne({user_id: user_id, jahr: parseInt(jahr)});
    return result;
  }

  /*async createSteuerjahr(dataset) {
    let user_id = dataset.user_id;
    let jahr = parseInt(dataset.jahr); 
    let kosten = parseInt(dataset.kosten);
    let fahrtweg = parseInt(dataset.fahrtweg);
    
    // Calculate tax savings
    const fahrtkosten = fahrtweg * 0.3*225;
    const newWerbungskosten = fahrtkosten + kosten ;
    let steuerjahr = {
      user_id:            user_id,
      jahr:               jahr,
      werbungskosten:     parseFloat(newWerbungskosten.toFixed(2)),
    };

    // Display tax savings
    let result = await this._steuerjahr.insertOne(steuerjahr);
    return await this._steuerjahr.findOne({_id: result.insertedId});
  }*/
}