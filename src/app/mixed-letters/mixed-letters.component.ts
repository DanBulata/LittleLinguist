import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../../shared/model/category';
import { ExitGameComponent } from '../exit-game/exit-game.component';
import { CoinsComponent } from '../coins/coins.component';
import { TranslatedWord } from '../../shared/model/translated-word';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
  ResultRow,
  ResultsTableComponent,
} from '../results-table/results-table/results-table.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar/progress-bar.component';
import { FormsModule } from '@angular/forms';
import { WinLoseDialogComponent } from '../win-lose-dialog/win-lose-dialog.component';
import { CoinsService } from '../services/coins.service';

@Component({
  selector: 'app-mixed-letters',
  standalone: true,
  imports: [
    ExitGameComponent,
    CoinsComponent,
    MatFormFieldModule,
    MatDialogModule,
    CommonModule,
    MatInputModule,
    ResultsTableComponent,
    ProgressBarComponent,
    FormsModule,
    WinLoseDialogComponent,
  ],
  templateUrl: './mixed-letters.component.html',
  styleUrl: './mixed-letters.component.css',
})
export class MixedLettersComponent implements OnInit {
  @Input()
  id = '';
  currentCategory?: Category;
  grade: number = 0;

  currentWordIndex: number = 0;
  words: TranslatedWord[] = [];
  scrabledWords: string[] = [];
  results: ResultRow[] = [];
  guesses: boolean[] = []; 
  checkGuess: boolean = true; 
  countCorretGuesses: number = 0;
  numOfTries: number = 0;

  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private coinsService: CoinsService
  ) {}

  ngOnInit(): void {
    this.initGame();
  }

  initGame(): void {
    this.grade = 0;
    this.countCorretGuesses = 0;
    this.currentWordIndex = 0;
    this.guesses = [];
    this.results = [];
    this.scrabledWords = [];

    this.currentCategory = this.categoriesService.get(parseInt(this.id));
    let chosenCategoryWords: TranslatedWord[] =
      this.currentCategory?.words || [];

    const wordsMaxLength = chosenCategoryWords.length;
    const randomwords: TranslatedWord[] = [];
    for (let i = 0; i < wordsMaxLength; i++) {
      // כדי לא לבחור באותה מילה פעמיים, יש להוציא את המילה מהאפשרויות
      const wordIndex = Math.floor(Math.random() * chosenCategoryWords.length);
      const word = chosenCategoryWords[wordIndex];
      randomwords.push({ ...word, origin: word.origin.toLowerCase() });
      chosenCategoryWords = chosenCategoryWords
        .slice(0, wordIndex)
        .concat(chosenCategoryWords.slice(wordIndex + 1));
    }

    this.words = randomwords;
    this.numOfTries = randomwords.length;

    for (const word of this.words) {
      this.scrabledWords.push(this.scramble(word.origin));
    }

    console.log('words: ', this.words);
    console.log('s: ', this.scrabledWords);
  }

  reset() {
    this.initGame();
  }

  scramble(word: string): string {
    const array = word.split('');

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array.join('');
  }

  submit(): void {
    const currentWord = this.words[this.currentWordIndex];
    const gussedCorrectly = currentWord.origin === currentWord.guess.toLowerCase(); 
    this.guesses.push(gussedCorrectly);
    const dialogRef = this.dialog.open(WinLoseDialogComponent, {
      data: { isSuccess: gussedCorrectly },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.currentWordIndex++;

      if (gussedCorrectly) {
        this.grade += Math.floor(100 / this.words.length);
        this.countCorretGuesses++;
      }


      if (this.currentWordIndex === this.words.length) {
        for (let guess of this.guesses) {
          if (guess == false) {
            this.checkGuess = false;
          }
        }
        if (this.checkGuess == true) {
          this.grade = 100;
        }
      }


      if (this.currentWordIndex === this.words.length) {
        this.coinsService.set(this.coinsService.get() + this.grade);

        for (let i = 0; i < this.words.length; i++) {
          this.results = this.results.concat({
            correct: this.guesses[i],
            origin: this.words[i].origin,
            target: this.words[i].target,
          });
        }
      }
    });
  }

  resetInput(): void {
    this.words[this.currentWordIndex].guess = '';
  }
}
