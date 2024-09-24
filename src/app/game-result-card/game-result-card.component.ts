import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameResult } from '../../shared/model/Game-Result';
import { CoinsComponent } from '../coins/coins.component';
import { CoinsService } from '../services/coins.service';
import { GameResultService } from '../services/game-result.service';
import { CategoriesService } from '../services/categories.service';
import { CategoriesListComponent } from '../categories-list/categories-list.component';

@Component({
  selector: 'app-game-result-card',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    CoinsComponent,
    CategoriesListComponent,
  ],
  templateUrl: './game-result-card.component.html',
  styleUrl: './game-result-card.component.css',
})
export class GameResultCardComponent implements OnInit {
  @Input()
  gameResults: GameResult[] = [];
  gamesCollection: GameResult[] = [];

  gameCount: number = 0;
  perfectGamesPercentage: number = 0;
  learnedCategoriesCount: number = 0;
  totalCategoriesCount: number = 0;
  learnedCategoriesPercentage: number = 0;
  categoriesYetToLearn: number = 0;
  mostPlayedCategoryName: string = '';
  mostPlayedCategoryId: string = '';

  constructor(
    private coinsService: CoinsService,
    private gameResultService: GameResultService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.countGames();
    this.PerfectGames();
    this.countLearnedCategories();
    this.learntCategoriesPercentage();
    this.countYetToLearnCategories();
    this.mostPlayedCategory();
  }

  getCoins() {
    return this.coinsService.get();
  }

  countGames(): Promise<void> {
    return this.gameResultService.list().then((results) => {
      this.gameResults = results;
      this.gameCount = this.gameResults.length;
    });
  }

  async PerfectGames(): Promise<number> {
    const results = await this.gameResultService.list();
    this.gameResults = results;

    if (results.length === 0) {
      this.perfectGamesPercentage = 0;
    } else {
      // Count the number of perfect games (score 100)
      let perfectGamesCount = 0;
      results.forEach((game) => {
        if (game.numOfPoints === 100) {
          perfectGamesCount++;
        }
      });

      // Calculate the percentage of perfect games
      this.perfectGamesPercentage = parseFloat(
        ((perfectGamesCount / results.length) * 100).toFixed(1)
      );
    }

    return this.perfectGamesPercentage;
  }

  async countLearnedCategories(): Promise<number> {
    const results = await this.gameResultService.list();
    const learnedCategories: string[] = [];

    results.forEach((game) => {
      // אם הקטגוריה עדיין לא קיימת במערך, מוסיפים אותה
      if (!learnedCategories.includes(game.idCategory)) {
        learnedCategories.push(game.idCategory);
      }
    });
    this.learnedCategoriesCount = learnedCategories.length;
    return this.learnedCategoriesCount;
  }

  async learntCategoriesPercentage(): Promise<number> {
    const results = await this.categoriesService.list();
    const totalCategories: string[] = [];

    results.forEach((game) => {
      if (!totalCategories.includes(game.id)) {
        totalCategories.push(game.id);
      }
    });

    this.totalCategoriesCount = totalCategories.length;

    if (this.totalCategoriesCount > 0) {
      this.learnedCategoriesPercentage = parseFloat(
        (
          (this.learnedCategoriesCount / this.totalCategoriesCount) *
          100
        ).toFixed(1)
      );
    } else {
      this.learnedCategoriesPercentage = 0;
    }
    return this.learnedCategoriesPercentage;
  }

  async countYetToLearnCategories(): Promise<number> {
    await this.learntCategoriesPercentage();

    const categoriesYetToLearn =
      this.totalCategoriesCount - this.learnedCategoriesCount;

    this.categoriesYetToLearn =
      categoriesYetToLearn > 0 ? categoriesYetToLearn : 0;

    return this.categoriesYetToLearn;
  }

  async mostPlayedCategory(): Promise<string> {
    const results = await this.gameResultService.list();
    let highestCount = 0;
    const resultsArrStr: string[] = [];

    results.forEach((game) => {
      resultsArrStr.push(game.idCategory);
    });

    for (let i = 0; i < resultsArrStr.length; i++) {
      const categoryId = resultsArrStr[i];
      let currentCount = 0;

      for (let j = 0; j < resultsArrStr.length; j++) {
        if (resultsArrStr[j] === categoryId) {
          currentCount++;
        }
      }

      if (currentCount > highestCount) {
        highestCount = currentCount;
        this.mostPlayedCategoryId = categoryId;
      }
    }

    const categorysList = await this.categoriesService.list();
    for (const category of categorysList) {
      if (category.id === this.mostPlayedCategoryId) {
        this.mostPlayedCategoryName = category.name;
        return this.mostPlayedCategoryName;
      }
    }

    return 'No category found';
  }
}
