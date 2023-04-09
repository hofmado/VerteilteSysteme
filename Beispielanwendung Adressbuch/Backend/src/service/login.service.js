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
    async read(username, _password) {
      try {
        let user = await this._users.findOne({ username: username, password: password });
          
          return user._id;
         
        } catch (error) {
          return null;
        }
      }
    

    /**
     * Speichern eines Users.
     *
     * @param {Object} user Zu speichernde daten
     * @return {Promise} Gespeicherte daten
     */
    async create(user) {
        user = user || {};

        let newUser = {
            username: user.username,
            password:  user.password,
        };

        let result = await this._users.insertOne(newUser);
        return await this._users.findOne({_id: result.insertedId});
    }
}
