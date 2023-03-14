//Art des Studiums

//Anzahl der Semester

//Nebenbeschäftigung
//HiWi
//2. Job
//Aushilfsjob

/* Abgabepflicht oder freiwillige Steuererklärung?
– freiwillig: z. B. bei Anstellung als Werkstudent:in oder Jobben in den Semesterferien
– Abgabepflicht: z. B. bei mehreren Jobs parallel neben dem Studium
Studienkosten absetzbar als Sonderausgaben oder Werbungskosten
– Erststudium: jährlich 6.000 Euro als Sonderausgaben, kein Verlustvortrag möglich
– Zweitstudium: Kosten in unbegrenzter Höhe als Werbungskosten absetzbar und Verlustvortrag möglich
Definition Zweitstudium = Studium nach einer abgeschlossenen Erstausbildung bzw. einem abgeschlossenen Erststudium
Duales Studium: Studienkosten auch als Werbungskosten absetzbar und Verlustvortrag möglich
Abgabefristen der Steuererklärung
– bei Abgabepflicht: Abgabefrist ohne steuerlichen Vertreter am 31.07. des Folgejahres, mit steuerlichem Vertreter am letzten Februartag des Zweitfolgejahres
– bei keiner Abgabepflicht: Abgabefrist am 31.12. des 4. Folgejahres bzw. Verlustvortrag bis zu 7 Jahre rückwirkend möglich*/

//Rückwirkende Steuererklärung, 7 Jahre für Studenten

// Import der Klasse zum Zugriff auf die MongoDB
import { MongoClient } from "mongodb";

// Verbindung mit dem Datenbankserver herstellen
let client = new MongoClient("mongodb://localhost:27017");
await this.client.connect();

// Öffnen einer Datenbank (Sammelcontainer für mehrere Collections)
let database = this.client.db("adressbook");

// Zugriff auf eine einzelne Collection ermöglichen (beinhaltet die Daten)
let addresses = this.database.collection("addresses");

// Anzahl der vorhandenen Einträge schätzen
let count = await addresses.estimatedDocumentCount();

// Neue Einträge anlegen
addresses.insertMany([
    {
        first_name: "Willy",
        last_name: "Tanner",
        phone: "+49 711 564412",
        email: "willy.tanner@alf.com",
    },
    {
        first_name: "Michael",
        last_name: "Knight",
        phone: "+49 721 554194",
        email: "michael@knight-rider.com",
    },
]);

// Auslesen eines Eintrags anhand seiner ID
let id = "47110815";
let result = await addresses.findOne({_id: new ObjectId(id)});

// Löschen eines Eintrags anhand seiner ID
let result = this._addresses.deleteOne({_id: new ObjectId(id)});
let count = result.deletedCount;

// Speichern eines neuen Eintrags
let newAddress = {
    first_name: address.first_name || "",
    last_name:  address.last_name  || "",
    phone:      address.phone      || "",
    email:      address.email      || "",
};

let result = await this._addresses.insertOne(newAddress);

// Einträge suchen und zurückgeben
let query = {
    first_name: "Willy",
};

let cursor = addresses.find(query, {
    sort: {
        first_name: 1,
        last_name: 1,
    }
});

let result = cursor.toArray();

// Ändern eines Eintrags
let updateDoc = {
    $set: {
        first_name: "Willy",
        last_name: "Tanner",
    },
}

//Berechnungen vornehmen
let semester = [];

let anzahlSemester = semester.length();

let gesamtersparnis = 0;

//Steuereinsparungen über alle Semester addieren
let steuernges;

for(let i = 0; i < semester.length; i++){

    gesamtersparnis += semester[i];
}


await addresses.updateOne({_id: new ObjectId(id)}, updateDoc);
let newEntry = addresses.findOne({_id: new ObjectId(id)});