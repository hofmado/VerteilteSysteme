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
                    {Username:       {$regex: query.search, $options: "i"}},
                    {Password:       {$regex: query.search}},
                ]
            };
        } else {
            throw new Error("Username not found")
        }


        let cursor = this._songs.find(queryDoc, {
            sort: {
                name: 1,
                artist: 1,
            }
        });

        return cursor.toArray();
    }
};
