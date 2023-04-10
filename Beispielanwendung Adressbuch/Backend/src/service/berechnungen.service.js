import DatabaseFactory from "../database.js";
import {CURSOR_FLAGS, Int32, ObjectId} from "mongodb";

export default class berechnungen_service {

  constructor() {
    this._einsparungen = DatabaseFactory.database.collection("einsparungsjahr"); //TODO Service mit funktionalität aus frontend 
  }
/**
   * Auslesen eines Einsparungsjahrs
   *
   * @param {string} user_id User ID
   * @param {number} jahr Zu gespeichertem Einsparungsjahr
   * @return {Promise} Das Einsparungsjahr Objekt
   */
  async readEinsparungsjahr(user_id, jahr) { //TODO nennen wie collection element in API
    let result = await this._einsparungen.findOne({user_id: user_id, jahr: parseInt(jahr)});
    return result._einsparungen;
  }
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
