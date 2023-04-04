"use strict"

import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";


export default class LoginService {
    /**
     * Konstruktor.
     */
    constructor() {
        this._users = DatabaseFactory.database.collection("users");
    }

    /**
     * @param {Object} query Optionale Suchparameter
     * @return {Promise} Liste der gefundenen Adressen
     */
    async read(_username, _password) {
      try {
        const user = await this._collection.findOne({ _username });
          if (user && user.password === _password) {
            return user._id;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      }
    

    /**
     * Speichern eines Users.
     *
     * @param {Object} user Zu speichernde Adressdaten
     * @return {Promise} Gespeicherte Adressdaten
     */
    async create(user) {
        user = user || {};

        let newUser = {
            username: user.username || "",
            password:  user.password  || "",
        };

        let result = await this._users.insertOne(newUser);
        return await this._users.findOne({_id: result.insertedId});
    }
}
