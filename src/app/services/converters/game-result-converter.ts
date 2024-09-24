import {
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@angular/fire/firestore';
import { GameResult } from '../../../shared/model/Game-Result';

export const GameResultConverter = {
  toFirestore: (gameToSave: GameResult) => {
    return {
      idCategory: gameToSave.idCategory,
      idGame: gameToSave.idGame,
      date: gameToSave.date,
      numOfPoints: gameToSave.numOfPoints,
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): GameResult => {
    const data = snapshot.data(options);

    const idCategory = data['idCategory'];
    const idGame = data['idGame'];
    const date = data['date'].toDate();
    const numOfPoints = data['numOfPoints'];

    const gameResult = new GameResult(idCategory, idGame, date, numOfPoints);
    return gameResult;
  },
};
