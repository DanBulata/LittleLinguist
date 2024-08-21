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
  isSuccess: boolean | undefined;
  // isSuccess=true

  categoryList: Category[] = [];
  words? :TranslatedWord[];


  constructor(private categoriesService: CategoriesService, private dialog: MatDialog) { }



  ngOnInit(): void {
    this.currentCategory = this.categoriesService.get(parseInt(this.id));

    //מערך מילים מהקטגוריה שנבחרה על ידי המשתמש
    let chosenCategoryWords: TranslatedWord[] = this.currentCategory?.words || [];

    //שלוש מילים רנדומליות מהקטגוריה שנבחרה על ידי המשתמש
    let randomwords1: string[] = []
    for (let i = 0; i < 3; i++) {
      if (chosenCategoryWords.length > 0) {
        randomwords1.push(chosenCategoryWords[Math.floor(Math.random() * (chosenCategoryWords.length ))].origin)
      }
    }

    //רשימת הקטגוריות
    this.categoryList = this.categoriesService.list();

    //מערך של מילים מקטגוריה רנדומלית
    let randomCategoryWords = this.categoryList[Math.floor(Math.random() * this.categoryList.length )].words

    //שלוש מילים מקטגוריה רנדומלית
    let randomwords2: string[] = []
    for (let i = 0; i < 3; i++) {
      if (chosenCategoryWords.length > 0) {
        randomwords2.push(randomCategoryWords[Math.floor(Math.random() * (randomCategoryWords.length ))].origin)
      }
    }

    //מערך עם שש מילים 
    let combinedArray = randomwords1.concat(randomwords2);    //012345
    //מערך עם שש מילים מעורבבות
    let randomCombinedArray=[];
    for (let i=0;i<6;i++) {
      randomCombinedArray.push(combinedArray[Math.floor(Math.random() * combinedArray.length)])
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WinLoseDialogComponent, { data: { isSuccess: this.isSuccess } })
  }


}



