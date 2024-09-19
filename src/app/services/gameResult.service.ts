import { Injectable } from '@angular/core';
import { collection, DocumentSnapshot, Firestore, getDocs, Timestamp, QuerySnapshot } from '@angular/fire/firestore';
import { GameResultConverter } from './converters/gameResultconverter';


@Injectable({
  providedIn: 'root',
})

export class GameResult {
    constructor(private firestore: Firestore) {}
    gameList? : GameResult[]=[];
    idCategory?: string;
    idGame?: string;
    date?: Timestamp;
    numOfPoints?: number;

    private addGameResult(gameResult: GameResult) {
        this.gameList?.push(gameResult)
    }    

    async list(): Promise<GameResult[]> {
        const gamesCollection = collection(this.firestore, 'gamesCollection').withConverter(GameResultConverter)
        const QuerySnapshot: QuerySnapshot<GameResult> = await getDocs(gamesCollection)
        
        const result: GameResult[] = [];
    
        QuerySnapshot.docs.forEach((docSnap: DocumentSnapshot<GameResult>)=>{
          const data = docSnap.data();
          if(data){ 
            result.push(data)
          }
        })
        return result
        }
    


}