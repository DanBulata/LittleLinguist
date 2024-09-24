import { Injectable } from '@angular/core';
import {
  collection,
  DocumentSnapshot,
  Firestore,
  getDocs,
  QuerySnapshot,
  addDoc,
} from '@angular/fire/firestore';
import { GameResultConverter } from './converters/game-result-converter';
import { GameResult } from '../../shared/model/Game-Result';

@Injectable({
  providedIn: 'root',
})
export class GameResultService {
  constructor(private firestore: Firestore) {}

  async addGameResult(gameResult: GameResult) {
    const gamesCollection = collection(
      this.firestore,
      'gamesCollection'
    ).withConverter(GameResultConverter);
    await addDoc(gamesCollection, gameResult);
  }

  async list(): Promise<GameResult[]> {
    const gamesCollection = collection(
      this.firestore,
      'gamesCollection'
    ).withConverter(GameResultConverter);
    const QuerySnapshot: QuerySnapshot<GameResult> = await getDocs(
      gamesCollection
    );
    const result: GameResult[] = [];

    QuerySnapshot.docs.forEach((docSnap: DocumentSnapshot<GameResult>) => {
      const data = docSnap.data();
      if (data) {
        result.push(data);
      }
    });
    return result;
  }
}
