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
  styleUrl: './word-sorter.component.css',
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
    private coinsService: CoinsService
  ) {}

  ngOnInit(): void {
    this.initGame();
  }

  initGame(): void {
    const categoryId = (this.id);
    this.currentCategory = this.categoriesService.get(categoryId);
    this.currentWordIndex = 0;
    this.grade = 0;
    this.countCorretGuesses = 0;

    //מערך מילים מהקטגוריה שנבחרה על ידי המשתמש
    let chosenCategoryWords: TranslatedWord[] =
      this.currentCategory?.words || [];

    //שלוש מילים רנדומליות מהקטגוריה שנבחרה על ידי המשתמש
    const randomWordsChosen: GameWord[] = [];
    for (let i = 0; i < 3; i++) {
      // כדי לא לבחור באותה מילה פעמיים, יש להוציא את המילה מהאפשרויות
      const wordIndex = Math.floor(Math.random() * chosenCategoryWords.length);
      const word = chosenCategoryWords[wordIndex];
      randomWordsChosen.push({
        origin: word.origin,
        isInCurrentCategory: true,
      });
      chosenCategoryWords = chosenCategoryWords
        .slice(0, wordIndex)
        .concat(chosenCategoryWords
        .slice(wordIndex + 1));
    }

    //רשימת הקטגוריות
    const categoryList = this.categoriesService.list();

     //מערך של מילים מקטגוריה רנדומלית
    const filteredCategoryList = categoryList.filter(
      (category : Category) => category.id !== categoryId
    );
    let randomCategoryWords =
      filteredCategoryList[
        Math.floor(Math.random() * filteredCategoryList.length)
      ].words;

    //שלוש מילים מקטגוריה רנדומלית
    const randomWordsOther: GameWord[] = [];
    for (let i = 0; i < 3; i++) {
      // כדי לא לבחור באותה מילה פעמיים, יש להוציא את המילה מהאפשרויות
      const wordIndex = Math.floor(Math.random() * randomCategoryWords.length);
      const word = randomCategoryWords[wordIndex];
      randomWordsOther.push({
        origin: word.origin,
        isInCurrentCategory: false,
      });
      randomCategoryWords = randomCategoryWords
        .slice(0, wordIndex)
        .concat(randomCategoryWords
        .slice(wordIndex + 1));
    }

    //מערך עם שש מילים
    let combinedArray = randomWordsChosen.concat(randomWordsOther);

    //מערך עם שש מילים מעורבבות
    const randomCombinedArray = [];
    for (let i = 0; i < 6; i++) {
      const wordIndex = Math.floor(Math.random() * combinedArray.length);
      const word = combinedArray[wordIndex];
      randomCombinedArray.push(word);
      combinedArray = combinedArray
        .slice(0, wordIndex)
        .concat(combinedArray
        .slice(wordIndex + 1));
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
      data:  gussedCorrectly 
    });

    dialogRef.afterClosed().subscribe(() => {
      this.guesses.push(gussedCorrectly);
      this.currentWordIndex++;

      if (gussedCorrectly) {
        this.grade += Math.floor(100 / this.words.length);
        if (this.grade == 96) {
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
      }
    });
  }
}
