import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameResult } from '../../shared/model/Game-Result';
import { CoinsComponent } from '../coins/coins.component';
import { CoinsService } from '../services/coins.service';
import { GameResultService } from '../services/game-result.service';

@Component({
  selector: 'app-game-result-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, CoinsComponent],
  templateUrl: './game-result-card.component.html',
  styleUrl: './game-result-card.component.css'
})
export class GameResultCardComponent {
  @Input()
  gameresults: GameResult[]=[];
  gamesCollection: GameResult[] = [];

  gameCount: number = 0;
  perfectGamesPercentage: number = 0;
  learnedCategoriesCount: number = 0;
  totalCategoriesCount: number = 0; // משתנה חדש לאחסן את מספר הקטגוריות הכולל
  learnedCategoriesPercentage: number = 0; // משתנה חדש לאחסן את אחוז הקטגוריות שנלמדו

  constructor(
    private coinsService: CoinsService,
    private gameResultService: GameResultService
  ) {}

  ngOnInit(): void {
    this.countGames().then(() => {
      this.PerfectGames().then(() => {
        this.countLearnedCategories().then(() => {
          this.calculateTotalCategories().then(() => {
            this.calculateLearnedCategoriesPercentage(); // חישוב אחוז הקטגוריות שנלמדו
          });
        });
      });
    });
  }

  getCoins() {
    return this.coinsService.get()
  }

  countGames(): Promise<void> {
    return this.gameResultService.list().then((results) => {
      this.gameresults = results;
      this.gameCount = this.gameresults.length; 
    });
  }

async PerfectGames(): Promise<number> {
  const results = await this.gameResultService.list();
  this.gameresults = results;

  if (results.length === 0) {
    this.perfectGamesPercentage = 0; // Set the percentage to 0 if no results
  } else {
    // Count the number of perfect games (score 100)
    let perfectGamesCount = 0;
    results.forEach((game) => {
      if (game.numOfPoints === 100) {
        perfectGamesCount++;
      }
    });

    // Calculate the percentage of perfect games
    this.perfectGamesPercentage = parseFloat(((perfectGamesCount / results.length) * 100).toFixed(1));
  }             

  return this.perfectGamesPercentage;
}

async countLearnedCategories(): Promise<number> {
  const results = await this.gameResultService.list();
  const learnedCategories: string[] = []; // מערך לשמירת הקטגוריות

  results.forEach(game => {
    // אם הקטגוריה עדיין לא קיימת במערך, מוסיפים אותה
    if (!learnedCategories.includes(game.idCategory)) {
      learnedCategories.push(game.idCategory);
    }
  });
  this.learnedCategoriesCount = learnedCategories.length
  // const countLearnedCategories = learnedCategories.length
  return this.learnedCategoriesCount; // מחזירים את מספר הקטגוריות הייחודיות
}

// calculateLearnedCategoriesPercentage(): void {
//   if (this.totalCategoriesCount > 0) {
//     this.learnedCategoriesPercentage = parseFloat(((this.learnedCategoriesCount / this.totalCategoriesCount) * 100).toFixed(1));
//   } else {
//     this.learnedCategoriesPercentage = 0;
//   }
// }

 
  // פונקציה חדשה לחישוב הקטגוריות הכוללות
  async calculateTotalCategories(): Promise<void> {
    const results = await this.gameResultService.list();
    const totalCategories: string[] = []; // מערך לשמירת הקטגוריות הייחודיות

    results.forEach((game) => {
      if (!totalCategories.includes(game.idCategory)) {
        totalCategories.push(game.idCategory);
      }
    });

    this.totalCategoriesCount = totalCategories.length; // מספר הקטגוריות הכוללות
    console.log('gameresults:', this.gameresults);
    console.log('learnedCategoriesCount:', this.learnedCategoriesCount);
    console.log('totalCategoriesCount:', this.totalCategoriesCount);
    console.log('perfectGamesPercentage:', this.perfectGamesPercentage);
  }

  // פונקציה חדשה לחישוב אחוז הקטגוריות שנלמדו
  calculateLearnedCategoriesPercentage() {
    if (this.totalCategoriesCount > 0) {
      this.learnedCategoriesPercentage = parseFloat(((this.learnedCategoriesCount / this.totalCategoriesCount) * 100).toFixed(1));
    } else {
      this.learnedCategoriesPercentage = 0;
    }
   

  }

  
}




