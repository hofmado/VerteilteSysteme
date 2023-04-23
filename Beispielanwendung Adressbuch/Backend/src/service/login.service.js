import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";


export default class LoginService {
    /**
     * Konstruktor.
     */
    constructor() {
        this._users = DatabaseFactory.database.collection("user");
    }

    /**
     * @param {Object} query Optionale Suchparameter
     * @return {Promise} Liste der gefundenen Adressen
     */
    async readUser(username, password) {
      try {
        let user = await this._users.findOne({ username: username, password: password });
        return user;
         
      }catch (error) {
          return null;
        }
      }
    

    /**
     * Speichern eines Users.
     *
     * @param {Object} user Zu speichernde daten
     * @return {Promise} Gespeicherte daten
     */
    async createUser(user) {
      let username = user.username;
      let password = user.password;
      let newUser = {
        username: username,
        password:  password,
      };

        let result = await this._users.insertOne(newUser);
        return await this._users.findOne({_id: result.insertedId});
    }
}
