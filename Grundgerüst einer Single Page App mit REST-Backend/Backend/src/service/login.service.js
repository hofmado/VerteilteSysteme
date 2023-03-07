import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";

export default class login_service{
    constructor(){
        this._login = DatabaseFactory.database.collection("login");
    }
    async search(query) {
        let queryDoc = {};

        if (query.search) {
            queryDoc = {
                $and: [
                    {username:       {$regex: query.search, $options: "i"}},
                    {password:       {$regex: query.search}},
                ]
            };
        } else {
            throw new Error("Username not found")
        }


        let cursor = this.username.find(queryDoc, {
            sort: {
                name: 1,
                artist: 1,
            }
        });

        return cursor.toArray();
    }
    async create(user){
       username = user || {};

       let newUser= {
        username: username ||"",
        passowrd: username.password ||"",

       };
       // Get input values
       
       let username = parse


    }
};
