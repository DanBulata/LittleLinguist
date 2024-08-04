import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { gameProfile } from '../../shared/model/game-profile';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-select-game-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatFormFieldModule, MatSelectModule, MatButtonModule, FormsModule, RouterModule],
  templateUrl: './select-category-dialog.component.html',
  styleUrl: './select-category-dialog.component.css'
})
export class SelectGameDialogComponent implements OnInit {




  categorys: Category[] = [];
  selectedCategory: any;



  constructor(private categoriesService: CategoriesService, @Inject(MAT_DIALOG_DATA) public game: gameProfile) { }



  ngOnInit(): void {
    this.categorys = this.categoriesService.list()
  }
}
