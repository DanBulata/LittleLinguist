  export class GamePlayed {
    date: Date;
    idCategory : string;
    numOfPoints: number;
  
    constructor(date: Date, idCategory : string, numOfPoints: number) {
      this.date = date;                
      this.idCategory = idCategory ;    
      this.numOfPoints = numOfPoints;  
    }
  }
  

