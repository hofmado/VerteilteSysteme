import database from "../database.js";
import DatabaseFactory from "../database.js";
import {CURSOR_FLAGS, Int32, ObjectId} from "mongodb";

export default class SteuerGraphen {

    constructor(){
            this._steuerjahr = DatabaseFactory.database.collection("steuerjahr"); 
    }

    async alleUserSteuerjahre(){
        
    }
}