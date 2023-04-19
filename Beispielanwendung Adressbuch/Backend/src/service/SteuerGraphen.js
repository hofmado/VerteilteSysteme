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

    async wertBere(){
        const usere = await this._graphen.distinct("user_id"); 
        console.log(usere); 

        const jahre = await this._graphen.distinct("jahr"); 
        console.log(jahre);

        let durchschnittsArray =[]; 
        let jahreArray = []; 
        let graphenArray = []; 

        for( let laufJahr of jahre){
            console.log(jahre); 
            for(let laufUser of usere){
            const graphen = await this._graphen.find({ jahr: laufJahr, user_id: laufUser }).toArray();
            console.log(graphen);
            const werbungskostenArray = graphen.map(graph => graph.werbungskosten);
            graphenArray.push(...werbungskostenArray);
            }
        }
        console.log(graphenArray);
        let graphenArray2 = []; 
        let t = 0; 
        for(let i = 0; i<graphenArray.length -1; i+=2){
            graphenArray2[t] = (graphenArray[i]+ graphenArray[i+1])/2; 
            t++; 
        }
        console.log(graphenArray2); 
        return graphenArray2; 


        /*const usere = await this._graphen.distinct("user_id"); 
        console.log(usere); 

        const jahre = await this._graphen.distinct("jahr"); 
        console.log(jahre);

        let durchschnittsArray =[]; 
        let jahreArray = []; 
        let graphenArray = []; 

        for(let laufUser of usere){
            console.log(laufUser); 
            for(let laufJahr of jahre){
            const graphen = await this._graphen.find({ jahr: laufJahr, user_id: laufUser }).toArray();
            console.log(graphen);
            const werbungskostenArray = graphen.map(graph => graph.werbungskosten);
            graphenArray.push(...werbungskostenArray);
            }
        }
        console.log(graphenArray);*/
        
        /*const jahre = await this._graphen.distinct("jahr");
        console.log(jahre); 
        
        let durchschnittsArray = [];
        let jahreArray = [];

        for(let laufJahr of jahre){
            const graphen = await this._graphen.find({ jahr: laufJahr }).toArray();
            console.log(graphen); 
            const werbungskostenArray = graphen.map(graph => graph.werbungskosten);
            console.log(werbungskostenArray); 
            const summeWerbungskosten = werbungskostenArray.reduce((sum, werbungskosten) => sum + werbungskosten, 0);
            console.log(summeWerbungskosten);
            const durchschnittWerbungskosten = summeWerbungskosten / werbungskostenArray.length;
            durchschnittsArray.push(durchschnittWerbungskosten);
            jahreArray.push(laufJahr);
        }
        
        console.log(durchschnittsArray.reverse());
        console.log(jahreArray);
        console.log("Moin");
        return { durchschnittsArray: durchschnittsArray.reverse(),  jahreArray };*/
    }
}

    

    
      
    

