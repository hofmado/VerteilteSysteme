import database from "../database.js";
import DatabaseFactory from "../database.js";
import {CURSOR_FLAGS, Int32, MongoCursorInUseError, ObjectID, ObjectId} from "mongodb";

export default class SteuerGraphen {

    constructor(){
            this._graphen = DatabaseFactory.database.collection("Graphen"); 
            this._stampdaten = DatabaseFactory.database.collection("Stampdaten"); 
    }

    async graphenzeug(user_id){
        return this.wertBere();
        
    }

    async nutzerZeug(dataset){
        const resPlatz = dataset.user_id; 
        if (resPlatz != undefined){
            console.log(resPlatz);
            const now = new Date(); 
            console.log(now);
            let timestamp = {
                user_id: resPlatz, 
                heutedatum: now,
            }; 
            let result = await this._stampdaten.insertOne(timestamp); 
            console.log(result.insertedId); 
        }
        return {_resid: resPlatz};
    }
   

    async wertBere(){
        //alle User raussuchen 
        const usere = await this._graphen.distinct("user_id"); 
        //alle Jahre raussuchen 
        const jahre = await this._graphen.distinct("jahr"); 
        //Array, aufgeteilt nach jahren mit allen entsprechenden Usereinträgen 
        let graphenArray = []; 
        let AnzahlArray = [];
        for( let laufJahr of jahre){
            let z = 0; 
            for(let laufUser of usere){
            const graphen = await this._graphen.find({ jahr: laufJahr, user_id: laufUser }).toArray();
            const werbungskostenArray = graphen.map(graph => graph.werbungskosten);
            graphenArray.push(...werbungskostenArray);
            z++; 
            }
            AnzahlArray.push(z); 
        }
        //Array für die Durchschnittswerte
        let graphenArray3 = []; 
        let n = 0; 
        for(let i = 0; i<=graphenArray.length - AnzahlArray[AnzahlArray.length-1]; i+= AnzahlArray[n]){
            let zwischenwert = 0; 
            for(let m = 0; m < AnzahlArray[n]; m++){
                zwischenwert += graphenArray[m+i]
            }
            graphenArray3[n] = (zwischenwert / AnzahlArray[n]); 
            n++;
        }
        const comboArray = graphenArray3.concat(jahre);
        return comboArray; 
    }
}

    

    
      
    

