//import DatabaseFactory from "app/source/database.js";
import { MongoClient } from "mongodb";

class DatabaseFactory {
  /**
   * Ersatz für den Konstruktor, damit aus dem Hauptprogramm heraus die
   * Verbindungs-URL der MongoDB übergeben werden kann. Hier wird dann
   * auch gleich die Verbindung hergestellt.
   *
   * @param {String} connectionUrl URL-String mit den Verbindungsdaten
   */
  async init(connectionUrl) {
      // Datenbankverbindung herstellen
      this.client = new MongoClient(connectionUrl);
      await this.client.connect();
      this.database = this.client.db("Steuer");
      

      await this._createDemoData();
  }

  /**
     * Hilfsmethode zum Anlegen von Demodaten. Würde man so in einer
     * Produktivanwendung natürlich nicht machen, aber so sehen wir
     * wenigstens gleich ein paar Daten.
     */
  async _createDemoData() {

    let berechnungen = this.database.collection("berechnungen");


    let user = this.database.collection("berechnungen");
    if (await berechnungen.estimatedDocumentCount() === 0) {
        berechnungen.insertMany([
            {
                "user_id": "6420557cd5033a24fc6777aa",
                "jahr": 2023,
                "werbungskosten": 2500
            },
        ]);
        berechnungen.insertMany([
            {
                "user_id": "6420557cd5033a24fc6777aa",
                "jahr": 2022,
                "werbungskosten": 2500
            },
            {
                "user_id": "6420557cd5033a24fc6777aa",
                "jahr": 2021,
                "werbungskosten": 5500
            },
        ]);
    } 
}
}

export default new DatabaseFactory();
/*
export default new DatabaseFactory();

export default class steuerjahr_service {

  constructor() {
    this._steuerjahr = DatabaseFactory.database.collection("Steuerjahr");
  }
/**
   * Speichern eines neuen Steuerjahrs.
   *
   * @param {Object} jahr Zu gespeichertem Steuerjahr
   * @return {Promise} zu gespeichertes Steuerjahr
   
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
  /*
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
}*/
