//Hier get und put beschreiben

//Von root.controller erben lassen
const parent = require('./root.controller');

//ChatGPT-Code:
"use strict";

import express from "express";
import DatabaseFactory from "../database/DatabaseFactory.js";

const router = express.Router();

async function sumAllTaxYears(username) {
  const userCollection = DatabaseFactory.database.collection("user");

  const user = await userCollection.findOne({ username });

  let sum = 0;
  for (const year of user.Steuerjahr) {
    sum += year.Werbungskosten;
  }
  
  return sum;
}

router.get("/:username/sumAllTaxYears", async (req, res) => {
  const { username } = req.params;

  try {
    const sum = await sumAllTaxYears(username);
    res.status(200).send({ sum });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error retrieving sum of all tax years" });
  }
});

export default router;

/*import 

module.exports{

    ;

    
    * GET /address
    * Adressen suchen
    
async search(req, res, next) {
    // Aufruf der Serviceklasse
    let result = await this._service.search(req.query);

    // HTTP-Antwort generieren
    result.forEach(entity => this._insertHateoasLinks(entity));
    res.sendResult(result);
    return next();
}*/