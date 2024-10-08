import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { ExitGameComponent } from '../exit-game/exit-game.component';
import { CoinsComponent } from '../coins/coins.component';
import { WinLoseDialogComponent } from '../win-lose-dialog/win-lose-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslatedWord } from '../../shared/model/translated-word';
import { CoinsService } from '../services/coins.service';
import { MatTableModule } from '@angular/material/table';
import {
  ResultRow,
  ResultsTableComponent,
} from '../results-table/results-table/results-table.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from '../progress-bar/progress-bar/progress-bar.component';
import { GameResultService } from '../services/game-result.service';
import { GameResult } from '../../shared/model/Game-Result';

interface GameWord {
  origin: string;
  isInCurrentCategory: boolean;
}

@Component({
  selector: 'app-word-sorter',
  standalone: true,
  imports: [
    ExitGameComponent,
    CoinsComponent,
    MatIconModule,
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    ResultsTableComponent,
    MatProgressBarModule,
    ProgressBarComponent,
  ],
  templateUrl: './word-sorter.component.html',
  styleUrls: ['./word-sorter.component.css'],
})
export class WordSorterComponent implements OnInit {
  @Input()
  id = '';
  currentCategory?: Category;
  words: GameWord[] = [];
  currentWordIndex: number = 0;
  guesses: boolean[] = [];
  grade: number = 0;
  results: ResultRow[] = [];
  numOfTries: number = 0;
  countCorretGuesses: number = 0;

  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private coinsService: CoinsService,
    private gameResultService: GameResultService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.initGame();
  }

  async initGame(): Promise<void> {
    const categoryId = this.id;

    const category = await this.categoriesService.get(categoryId);

    if (!category) {
      console.error('Category not found');
      return;
    }

    this.currentCategory = category;
    this.currentWordIndex = 0;
    this.grade = 0;
    this.countCorretGuesses = 0;

    // Array of words from the chosen category
    let chosenCategoryWords: TranslatedWord[] = category.words || [];

    // Select three random words from the chosen category
    const randomWordsChosen: GameWord[] = [];
    for (let i = 0; i < 3; i++) {
      const wordIndex = Math.floor(Math.random() * chosenCategoryWords.length);
      const word = chosenCategoryWords[wordIndex];
      randomWordsChosen.push({
        origin: word.origin,
        isInCurrentCategory: true,
      });
      chosenCategoryWords = chosenCategoryWords
        .slice(0, wordIndex)
        .concat(chosenCategoryWords.slice(wordIndex + 1));
    }

    // List of categories
    const categoryList = await this.categoriesService.list();

    // Filter out the current category and select words from a random category
    const filteredCategoryList = categoryList.filter(
      (category: Category) => category.id !== categoryId
    );

    if (filteredCategoryList.length === 0) {
      console.error('No other categories available');
      return; //  Exit if no other categories
    }

    let randomCategoryWords =
      filteredCategoryList[
        Math.floor(Math.random() * filteredCategoryList.length)
      ].words;

    // Select three random words from a random category
    const randomWordsOther: GameWord[] = [];
    for (let i = 0; i < 3; i++) {
      const wordIndex = Math.floor(Math.random() * randomCategoryWords.length);
      const word = randomCategoryWords[wordIndex];
      randomWordsOther.push({
        origin: word.origin,
        isInCurrentCategory: false,
      });
      randomCategoryWords = randomCategoryWords
        .slice(0, wordIndex)
        .concat(randomCategoryWords.slice(wordIndex + 1));
    }

    // Combine the words
    let combinedArray = randomWordsChosen.concat(randomWordsOther);

    // Shuffle the combined array of words
    const randomCombinedArray = [];
    for (let i = 0; i < 6; i++) {
      const wordIndex = Math.floor(Math.random() * combinedArray.length);
      const word = combinedArray[wordIndex];
      randomCombinedArray.push(word);
      combinedArray = combinedArray
        .slice(0, wordIndex)
        .concat(combinedArray.slice(wordIndex + 1));
    }

    this.words = randomCombinedArray;
    this.numOfTries = randomCombinedArray.length;
  }

  resetGame(): void {
    this.initGame();
  }

  submit(isGuessWordInCurrentCategory: boolean): void {
    const word = this.words[this.currentWordIndex];
    const gussedCorrectly =
      word.isInCurrentCategory === isGuessWordInCurrentCategory;
    const dialogRef = this.dialog.open(WinLoseDialogComponent, {
      data: gussedCorrectly,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.guesses.push(gussedCorrectly);
      this.currentWordIndex++;

      if (gussedCorrectly) {
        this.grade += Math.floor(100 / this.words.length);
        if (this.grade === 96) {
          this.grade += 4;
        }
        this.countCorretGuesses++;
      }

      if (this.currentWordIndex === this.words.length) {
        this.coinsService.set(this.coinsService.get() + this.grade);
        this.results = [];
        for (let i = 0; i < this.words.length; i++) {
          this.results = this.results.concat({
            origin: this.words[i].origin,
            correct: this.guesses[i],
          });
        }

        const categoryId = this.id;
        const currentDate = new Date();
        const gameResult = new GameResult(
          categoryId,
          '2',
          currentDate,
          this.grade
        );
        this.gameResultService.addGameResult(gameResult);
      }
    });
  }
}
