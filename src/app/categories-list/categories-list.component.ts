/*
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatIconModule, MatButtonModule, RouterModule
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'numOfWords', 'lastUpdateDate', 'actions'];
  dataSource: Category[] = [];

  constructor(private categoriesService: CategoriesService, private dialogService: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = this.categoriesService.list();
  }

  deleteCategory(id: string, name: string) {
    const dialogRef = this.dialogService.open(DeleteCategoryDialogComponent, { data: name });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoriesService.delete(id);
        this.dataSource = this.categoriesService.list();
      }
    });
  }
}

*/


import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'numOfWords', 'lastUpdateDate', 'actions'];
  dataSource: Category[] = [];
  isFullyLoaded = false

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: MatDialog
  ) {}

  // async ngOnInit(): Promise<void> { // <-- Added async to ngOnInit
  //   try {
  //     this.dataSource = await this.categoriesService.list(); // <-- Await the promise
  //   } catch (error) {
  //     console.error('Failed to load categories:', error);
  //   }
  // }

   ngOnInit(): void { // <-- Added async to ngOnInit
this.categoriesService.list().then((result:Category[]) => {
  this.dataSource = result 
  this.isFullyLoaded = true  
})
  }


    // try {
    //   this.dataSource = await this.categoriesService.list(); // <-- Await the promise
    // } catch (error) {
    //   console.error('Failed to load categories:', error);
    // }
  

  deleteCategory(id: string, name: string): void {
    const dialogRef = this.dialogService.open(DeleteCategoryDialogComponent, { data: name });

    dialogRef.afterClosed().subscribe((result) => {        //****במצגת:  deletionResult****/
      if (result) {
        this.categoriesService.delete(id).then(() => {
          this.categoriesService.list().then((result:Category[]) => (this.dataSource=result))
        });
        this.refreshCategories(); // <-- Refresh the list after deletion
      }
    });
  }

  private async refreshCategories(): Promise<void> { // <-- Added refreshCategories method
    try {
      this.dataSource = await this.categoriesService.list(); // <-- Await the promise
    } catch (error) {
      console.error('Failed to refresh categories:', error);
    }
  }
}
