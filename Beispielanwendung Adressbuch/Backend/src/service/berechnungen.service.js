import DatabaseFactory from "../database.js";
import {CURSOR_FLAGS, Int32, ObjectId} from "mongodb";

export default class berechnungen_service {

  //TODO: Unterstrich bei Einsparungsjahr korrekt?
  constructor() {
    this._einsparungen = DatabaseFactory.database.collection("einsparungsjahr");

  }
/**
   * Auslesen eines Einsparungsjahrs
   *
   * @param {string} user_id User ID
   * @param {integer} jahr Zu gespeichertem Einsparungsjahr
   * @return {Promise} Das Einsparungsjahr Objekt
   */
  async getEinsparungsjahr(user_id, jahr) { 
    let result = await this._einsparungen.findOne({user_id: user_id, jahr: parseInt(jahr)});
    return result;
  }

  async createEinsparungen(dataset) {
    let user_id_ = dataset.user_id;
    let jahrbeginn_ = parseInt(dataset.jahrbeginn); 
    let jahrende_ = parseInt(dataset.jahrende);
    let gesamteinsparungen_ = parseInt(dataset.gesamteinsparungen);
    
    
    let gesamteinsparungen = {
      user_id:          user_id_,
      jahrbeginn:       jahrbeginn_,
      jahrende:         jahrende_,
      gesamteinsparungen:     gesamteinsparungen_
    };

    let result = await this._gesamteinsparungen.insertOne(gesamteinsparungen);
    return await this._gesamteinsparungen.findOne({_id: result.insertedId});
  }
}
