"use strict"
import DatabaseFactory from "../database.js";
import {CURSOR_FLAGS, Int32, ObjectId} from "mongodb";

import { MongoClient } from "mongodb";

//Allumfassende Methode, whatever; Klammer geht ganz unten zu
export default class berechnungen{

  constructor() {
    this.berechnungen = DatabaseFactory.database.collection("berechnungen");
  }
/**
   * Speichern eines neuen Steuerjahrs.
   *
   * @param {Object} jahr Zu gespeichertem Steuerjahr
   * @return {Promise} zu gespeichertes Steuerjahr
   */
  async readSteuerjahr(user_id, jahr) {
    let result = await this.berechnungen.findOne({user_id: user_id, jahr: parseInt(jahr)});
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
    };*/

    // Display tax savings
    /*let result = await this._steuerjahr.insertOne(steuerjahr);
    return await this._steuerjahr.findOne({_id: result.insertedId});
  }*/
}


//---------------------------------------------------------------------------------------------------------------------------------
//Lösung von ChatgGPT #2
/*
async function sumAllTaxYears(username) {
  const userCollection = DatabaseFactory.database.collection("user");

  const user = await userCollection.findOne({ username });

  let sum = 0;
  for (const year of user.Steuerjahr) {
    sum += year.Werbungskosten;
  }
  
  return sum;
}*/

//Lösung von ChatgGPT #1
/*async getSteuerjahre(username) {
  let gesamtWerbungskosten = 0;
  const userCollection = await DatabaseFactory.database.collection("user");
  const user = await userCollection.findOne({ username: username });
  if (!user) {
      console.error(`Benutzer ${username} nicht gefunden`);
      return null;
  }
  const steuerjahre = user.Steuerjahr;
  for (const steuerjahr of steuerjahre) {
      gesamtWerbungskosten += steuerjahr.Werbungskosten;
  }
  return gesamtWerbungskosten;
}*/

/*

Singleton-Klasse zum Zugriff auf das MongoDB-Datenbankobjekt, ohne dieses

ständig als Methodenparameter durchreichen zu müssen. Stattdessen kann

einfach das Singleton-Objekt dieser Klasse importiert und das Attribut

mongodb oder database ausgelesen werden.
/
class DatabaseFactory {


Ersatz für den Konstruktor, damit aus dem Hauptprogramm heraus die

Verbindungs-URL der MongoDB übergeben werden kann. Hier wird dann

auch gleich die Verbindung hergestellt.

@param {String} connectionUrl URL-String mit den Verbindungsdaten

async init(connectionUrl) {
// Datenbankverbindung herstellen
this.client = new MongoClient(connectionUrl);
await this.client.connect();
this.database = this.client.db("Steuer");

await this._createDemoData();
}



Hilfsmethode zum Anlegen von Demodaten. Würde man so in einer

Produktivanwendung natürlich nicht machen, aber so sehen wir

wenigstens gleich ein paar Daten.

async _createDemoData() {
let users = this.database.collection("user");

if (await users.estimatedDocumentCount() === 0) {
users.insertMany([
{
"Gesamt-Werbungskosten": 5000,
"Gesamt-Einkommen": 25000,
"username": "MaxMustermann",
"passwort": "geheimesPasswort",
"Steuerjahre": [
{
"Jahr": 2000,
"Werbungskosten": 5000
},
{
"Jahr": 2002,
"Werbungskosten": 5000
},
{
"Jahr": 2001,
"Werbungskosten": 5000
}
]
},
{
"Gesamt-Werbungskosten": 2000,
"Gesamt-Einkommen": 15000,
"username": "MusterMAx",
"passwort": "1",
"Steuerjahre": [
{
"Jahr": 2000,
"Werbungskosten": 1000
},
{
"Jahr": 2002,
"Werbungskosten": 500
},
{
"Jahr": 2001,
"Werbungskosten": 5000
}
]
}
])
}
}



Methode zum Abrufen eines Benutzers aus der Datenbank und Summieren aller
Werbungskosten über alle Steuerjahre.
@param {String} username - Der Benutzername des Benutzers, dessen Daten abgerufen werden sollen
@returns {Number} - Die Summe aller Werbungskosten des Benutzers

async sumWerbungskosten(username) {
const user = await this.database.collection("user").findOne({ username: username });
let sum = 0;
user.Steuerjahre.forEach((steuerjahr) => {
sum += steuerjahr*/