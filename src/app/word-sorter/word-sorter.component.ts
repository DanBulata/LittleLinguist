import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { ExitGameComponent } from "../exit-game/exit-game.component";
import { CoinsComponent } from "../coins/coins.component";
import { ExitDialogComponent } from '../exit-dialog/exit-dialog.component';
import { WinLoseDialogComponent } from '../win-lose-dialog/win-lose-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslatedWord } from '../../shared/model/translated-word';
import { CoinsService } from '../services/coins.service';

interface GameWord {
  origin: string;
  isInCurrentCategory: boolean;
}

@Component({
  selector: 'app-word-sorter',
  standalone: true,
  imports: [ExitGameComponent, CoinsComponent, MatIconModule, CommonModule, MatDialogModule],
  templateUrl: './word-sorter.component.html',
  styleUrl: './word-sorter.component.css'
})

export class WordSorterComponent implements OnInit {
  @Input()
  id = "";
  currentCategory?: Category;
  words: GameWord[] = []
  currentWordIndex: number = 0
  guesses: boolean[] = []

  constructor(private categoriesService: CategoriesService, private dialog: MatDialog, private coinsService: CoinsService) { }

  ngOnInit(): void {
    const categoryId = parseInt(this.id)
    this.currentCategory = this.categoriesService.get(categoryId);

    //מערך מילים מהקטגוריה שנבחרה על ידי המשתמש
    let chosenCategoryWords: TranslatedWord[] = this.currentCategory?.words || [];

    //שלוש מילים רנדומליות מהקטגוריה שנבחרה על ידי המשתמש
    let randomwords1: GameWord[] = []
    for (let i = 0; i < 3; i++) {
      // כדי לא לבחור באותה מילה פעמיים, יש להוציא את המילה מהאפשרויות
      const wordIndex = Math.floor(Math.random() * (chosenCategoryWords.length))
      const word = chosenCategoryWords[wordIndex]
      randomwords1.push({ origin: word.origin, isInCurrentCategory: true })
      chosenCategoryWords = chosenCategoryWords.slice(0, wordIndex).concat(chosenCategoryWords.slice(wordIndex + 1))
    }

    //רשימת הקטגוריות
    const categoryList = this.categoriesService.list();

    //מערך של מילים מקטגוריה רנדומלית
    const filteredCategoryList = this.categoriesService.list().filter(category => category.id !== categoryId)
    let randomCategoryWords = filteredCategoryList[Math.floor(Math.random() * filteredCategoryList.length)].words

    //שלוש מילים מקטגוריה רנדומלית
    let randomwords2: GameWord[] = []
    for (let i = 0; i < 3; i++) {
      // כדי לא לבחור באותה מילה פעמיים, יש להוציא את המילה מהאפשרויות
      const wordIndex = Math.floor(Math.random() * (randomCategoryWords.length))
      const word = randomCategoryWords[wordIndex]
      randomwords2.push({ origin: word.origin, isInCurrentCategory: false })
      randomCategoryWords = randomCategoryWords.slice(0, wordIndex).concat(randomCategoryWords.slice(wordIndex + 1))
    }

    //מערך עם שש מילים 
    let combinedArray = randomwords1.concat(randomwords2);    //012345

    //מערך עם שש מילים מעורבבות
    let randomCombinedArray = [];
    for (let i = 0; i < 6; i++) {
      const wordIndex = Math.floor(Math.random() * (combinedArray.length))
      const word = combinedArray[wordIndex]
      randomCombinedArray.push(word)
      combinedArray = combinedArray.slice(0, wordIndex).concat(combinedArray.slice(wordIndex + 1))
    }

    this.words = randomCombinedArray
  }

  submit(isGuessWordInCurrentCategory: boolean): void {
    const word = this.words[this.currentWordIndex]
    const gussedCorrectly = word.isInCurrentCategory === isGuessWordInCurrentCategory
    const dialogRef = this.dialog.open(WinLoseDialogComponent, { data: { isSuccess: gussedCorrectly } })

    dialogRef.afterClosed().subscribe(() => {
      this.guesses.push(gussedCorrectly)
      this.currentWordIndex++

      if (gussedCorrectly) {
        const addedCoins = Math.floor(100 / this.words.length) 
        this.coinsService.set(this.coinsService.get() + addedCoins)
      }

      if (this.currentWordIndex === this.words.length) {
        // show results screen
      }
    })
  }
}



