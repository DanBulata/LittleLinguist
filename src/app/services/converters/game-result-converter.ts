// import { QueryDocumentSnapshot,  SnapshotOptions } from '@angular/fire/firestore';
// import { GameResult } from '../gameResult.service';
// // import { Language } from '../../../shared/model/language';

// export const GameResultConverter = {
//   toFirestore: (gameToSave: GameResult) => {
// //     const gameList = [];
// //     if (gameToSave.gameList) {
// //     for (let i = 0; i < gameToSave.gameList.length; i++) {     //  **.games?**
// //         gameList.push({
// //         idCategory : gameToSave.gameList[i].idCategory,
// //         idGame : gameToSave.gameList[i].idGame,
// //         date : gameToSave.gameList[i].date,
// //         numOfPoints : gameToSave.gameList[i].numOfPoints
// //       });
// //     }
// // }

//     return {
//         idCategory: gameToSave.idCategory,
//         idGame: gameToSave.idGame,
//         date: gameToSave.date,
//         numOfPoints: gameToSave.numOfPoints
//       };
//     },


//     fromFirestore: (
//         snapshot: QueryDocumentSnapshot,
//         options: SnapshotOptions
//       ) => {
//         const data = snapshot.data(options)
    
//         const gameResult = new GameResult(
            
//         //   data['idCategory'],        
//         //   data['idGame'],
//         //   data['date'],   // gameResult.lastUpdateDate = data['lastUpdate'].toDate()  ??
//         //   data['numOfPoints']
//         )

//         return gameResult
//       }
      
//     };
    



//     import { QueryDocumentSnapshot, SnapshotOptions } from '@angular/fire/firestore';
// import { GameResult } from '../gameResult.service';

// export const GameResultConverter = {
//   toFirestore: (gameToSave: GameResult) => {
//     return {
//       idCategory: gameToSave.idCategory,
//       idGame: gameToSave.idGame,
//       date: gameToSave.date, // Assuming 'date' is already a Date object
//       numOfPoints: gameToSave.numOfPoints
//     };
//   },

//   fromFirestore: (
//     snapshot: QueryDocumentSnapshot,
//     options: SnapshotOptions
//   ): GameResult => {
//     const data = snapshot.data(options);

//     // Ensure that data has the required fields
//     if (!data) {
//       throw new Error("No data found in Firestore snapshot");
//     }

//     // Extract fields from data
//     const idCategory = data['idCategory'];
//     const idGame = data['idGame'];
//     const date = data['date'].toDate();  // Assuming 'date' is a Firestore Timestamp
//     const numOfPoints = data['numOfPoints'];

//     // Create and return a new GameResult object
//     const gameResult = new GameResult(
//       idCategory,
//       idGame,
//       date,
//       numOfPoints
//     );

//     return gameResult;
//   }
// };


import { QueryDocumentSnapshot, SnapshotOptions } from '@angular/fire/firestore';
import { GameResult } from '../game-result.service';

export const GameResultConverter = {
  toFirestore: (gameToSave: GameResult) => {
    return {
      idCategory: gameToSave.idCategory,
      idGame: gameToSave.idGame,
      date: gameToSave.date,  // Assuming 'date' is already a Date object
      numOfPoints: gameToSave.numOfPoints
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): GameResult => {
    const data = snapshot.data(options);  // Extract data from Firestore snapshot

     // **Extract fields from Firestore snapshot data**
    const idCategory = data['idCategory'];
    const idGame = data['idGame'];
    const date = data['date'].toDate();  // Convert Firestore Timestamp to Date
    const numOfPoints = data['numOfPoints'];

    // **Call the constructor with 4 arguments, as defined in the GameResult class**
    const gameResult =  new GameResult(idCategory, idGame, date, numOfPoints)
    return gameResult
  }
};















  