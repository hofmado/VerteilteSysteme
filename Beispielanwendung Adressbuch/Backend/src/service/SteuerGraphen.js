import database from "../database.js";
import DatabaseFactory from "../database.js";
import {CURSOR_FLAGS, Int32, MongoCursorInUseError, ObjectID, ObjectId} from "mongodb";

export default class SteuerGraphen {

    constructor(){
            this._graphen = DatabaseFactory.database.collection("Graphen"); 
    }

    async graphenzeug(user_id){
        return this.wertBere();
        
    }

    async nutzerZeug(dataset){
        const resPlatz = dataset.user_id; 
        console.log(resPlatz);
        return {_resid: resPlatz};
    }
    /*
    async nutzerZeug(uname){
        const resPlatz = uname; 
        if (resPlatz != undefined){
            console.log(resPlatz);
            const now = new Date(); 
            console.log(now);
            let timestamp = {
                user_id: user_id, 
                heutedatum: now,
            }; 
            let result = await this._stampdaten.insertOne(timestamp); 
            concolse.log(result.insertedId); 
        }

        return {_resid: resPlatz};
    }
    */

    async wertBere(){
        const usere = await this._graphen.distinct("user_id"); 

        const jahre = await this._graphen.distinct("jahr"); 

        let durchschnittsArray =[]; 
        let jahreArray = []; 
        let graphenArray = []; 

        for( let laufJahr of jahre){
            for(let laufUser of usere){
            const graphen = await this._graphen.find({ jahr: laufJahr, user_id: laufUser }).toArray();
            const werbungskostenArray = graphen.map(graph => graph.werbungskosten);
            graphenArray.push(...werbungskostenArray);
            }
        }
        let graphenArray2 = []; 
        let t = 0; 
        for(let i = 0; i<graphenArray.length -1; i+=2){
            graphenArray2[t] = (graphenArray[i]+ graphenArray[i+1])/2; 
            t++; 
        }
        const comboArray = graphenArray2.concat(jahre);
        return comboArray; 
    }
}

    

    
      
    

