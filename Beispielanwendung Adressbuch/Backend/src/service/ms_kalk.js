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
  async read(username, jahr) {
    let steuerjahrDoc = await steuerjahr.findOne({username: username, jahr: jahr});
    return steuerjahrDoc;
  }

  /**
   * Speichern einen neuen Songs.
   *
   * @param {Object} steuerjahr Zu speichernder Song
   * @return {Promise} Gespeichertes Song
   */
  async create(steuerjahr) {
      if(steuerjahr == null) return;

      let newSteuerJahr = {
        steuerjahr:         username.steuerjahr     || "",
        werbungskosten:     username.steuerjahr.werbungskosten || "",
        fahrtkosten:        username.steuerjahr.fahrtkosten    || "",
        absetzbarerbetrag:  username.steuerjahr.absetzbarerBetrag || "",
      };

      // Get input values
      let werbungskosten = parseInt(document.getElementById("werbungskosten").value);
      let fahrtweg = parseInt(document.getElementById("fahrtweg").value);
  
      // Calculate tax savings
      let fahrtkosten = fahrtweg * 0.3;
      let absetzbarerbetrag = fahrtkosten + werbungskosten ;
  
    // Display tax savings
    document.getElementById("absetztbarerbetrag").innerHTML = absetzbarerbetrag.toFixed(2) + " €";
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

  /**
   * Aktualisierung eines Songs, durch Überschreiben einzelner Felder
   * oder des gesamten Songobjekts (ohne die ID).
   *
   * @param {String} id ID des gesuchten Songs
   * @param {[type]} song Zu speichernde Songdaten
   * @return {Promise} Gespeicherte Songdaten oder undefined
   */
  async update(email, steuerjahr) {
      let oldSteuerjahr = await this._email.findOne({_id: new ObjectId(id)});
      if (!oldSteuerjahr) return;

      let updateDoc = {
          $set: {},
      }

      if (email.steuerjahr)         updateDoc.$set.steuerjahr        = email.steuerjahr;
      if (email.werbungskosten)     updateDoc.$set.werbungskosten    = email.werbungskosten;
      if (email.fahrtkosten)        updateDoc.$set.fahrtkosten       = email.fahrtkosten;
      if (email.absetzbarerBetrag)  updateDoc.$set.absetzbarerBetrag = email.absetzbarerBetrag;

      await this._email.updateOne({_id: new ObjectId(id)}, updateDoc);
      return this._email.findOne({_id: new ObjectId(id)});
  }
}