import database from "../database.js";
import DatabaseFactory from "../database.js";
import {CURSOR_FLAGS, Int32, ObjectID, ObjectId} from "mongodb";

export default class SteuerGraphen {

    constructor(){
            this._graphen = DatabaseFactory.database.collection("Graphen"); 
    }

    async graphenzeug(user_id){
        
        const users = await this._graphen.find({user_id: user_id}).toArray();
        const jahre = await this._graphen.distinct("jahr");
        
        let durchschnittsArray = [];
        let jahreArray = [];

        for(let laufJahr of jahre){
            const graphen = await this._graphen.find({  jahr: laufJahr }).toArray(); //user_id: user_id, entfernt
            const werbungskostenArray = graphen.map(graph => graph.werbungskosten);
            const summeWerbungskosten = werbungskostenArray.reduce((sum, werbungskosten) => sum + werbungskosten, 0);
            const durchschnittWerbungskosten = summeWerbungskosten / werbungskostenArray.length;
            durchschnittsArray.push(durchschnittWerbungskosten);
            jahreArray.push(laufJahr);
        }
        
        console.log(durchschnittsArray.reverse());
        console.log(jahreArray);
        console.log("Moin");
        return { durchschnittsArray: durchschnittsArray.reverse(),  jahreArray };
    }

    
      
    

}