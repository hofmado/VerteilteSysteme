import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";
import LoginPage from "/Frontend/src/page-list/login.js";

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


        let cursor = this.users.find(queryDoc, {
            sort: {
                username: 1,
            }
        });

        return cursor.toArray();
    }
    async create(user){
       user = user || {};

       let newUser= {
        username: username ||"",
        password: username.password ||"",

       };
       let result = await this.users.insertOne(newUser);
       return await this.users.findOne({_id: new ObjectId(id)});

    }
    
};
