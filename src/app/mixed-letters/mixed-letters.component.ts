import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../../shared/model/category';
import { ExitGameComponent } from "../exit-game/exit-game.component";
import { CoinsComponent } from "../coins/coins.component";
import { TranslatedWord } from '../../shared/model/translated-word';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mixed-letters',
  standalone: true,
  imports: [ExitGameComponent, CoinsComponent, MatFormFieldModule, MatDialogModule,CommonModule,MatInputModule],
  templateUrl: './mixed-letters.component.html',
  styleUrl: './mixed-letters.component.css'
})
export class MixedLettersComponent implements OnInit {
  @Input()
  id = "";
  currentCategory?: Category;
  words? :TranslatedWord[];
  index = -1;
  mixedWord: string = "";
chosenCategoryWords: any;
  constructor(private categoriesService: CategoriesService) { }


  ngOnInit(): void {
    this.currentCategory = this.categoriesService.get(parseInt(this.id));
    let chosenCategoryWords: TranslatedWord[] = this.currentCategory?.words || [];
    
  }













}

  
