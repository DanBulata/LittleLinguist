export class GameResult {
    idCategory: string;
    idGame: string;
    date: Date;
    numOfPoints: number;
  
    constructor(
      idCategory: string,
      idGame: string,
      date: Date,
      numOfPoints: number,
    ) {
      this.idCategory = idCategory;
      this.idGame = idGame;
      this.date = date;
      this.numOfPoints = numOfPoints;
    }
  }
  