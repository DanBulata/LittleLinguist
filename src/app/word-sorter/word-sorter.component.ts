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

  constructor(private categoriesService: CategoriesService, private dialog: MatDialog, private coinsService: CoinsService) { }

  ngOnInit(): void {
    this.currentCategory = this.categoriesService.get(parseInt(this.id));

    //מערך מילים מהקטגוריה שנבחרה על ידי המשתמש
    let chosenCategoryWords: TranslatedWord[] = this.currentCategory?.words || [];

    //שלוש מילים רנדומליות מהקטגוריה שנבחרה על ידי המשתמש
    let randomwords1: GameWord[] = []
    for (let i = 0; i < 3; i++) {
      const word = chosenCategoryWords[Math.floor(Math.random() * (chosenCategoryWords.length))]
      randomwords1.push({ origin: word.origin, isInCurrentCategory: true })
    }

    //רשימת הקטגוריות
    const categoryList = this.categoriesService.list();

    //מערך של מילים מקטגוריה רנדומלית
    let randomCategoryWords = categoryList[Math.floor(Math.random() * categoryList.length)].words

    //שלוש מילים מקטגוריה רנדומלית
    let randomwords2: GameWord[] = []
    for (let i = 0; i < 3; i++) {
      const word = randomCategoryWords[Math.floor(Math.random() * (randomCategoryWords.length))]
      randomwords2.push({ origin: word.origin, isInCurrentCategory: false })
    }

    //מערך עם שש מילים 
    let combinedArray = randomwords1.concat(randomwords2);    //012345

    //מערך עם שש מילים מעורבבות
    let randomCombinedArray = [];
    for (let i = 0; i < 6; i++) {
      randomCombinedArray.push(combinedArray[Math.floor(Math.random() * combinedArray.length)])
    }

    this.words = randomCombinedArray
  }

  submit(isGuessWordInCurrentCategory: boolean): void {
    const word = this.words[this.currentWordIndex]
    const gussedCorrectly = word.isInCurrentCategory === isGuessWordInCurrentCategory
    const dialogRef = this.dialog.open(WinLoseDialogComponent, { data: { isSuccess: gussedCorrectly } })

    dialogRef.afterClosed().subscribe(() => {
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



