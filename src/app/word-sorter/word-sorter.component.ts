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
  constructor(private categoriesService: CategoriesService, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.currentCategory = this.categoriesService.get(parseInt(this.id));
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(WinLoseDialogComponent, {data: { isSuccess: this.isSuccess }})
  }

}