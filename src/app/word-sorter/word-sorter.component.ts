import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-word-sorter',
  standalone: true,
  imports: [],
  templateUrl: './word-sorter.component.html',
  styleUrl: './word-sorter.component.css'
})

export class WordSorterComponent implements OnInit {
  @Input()
  id = "";
  currentCategory?: Category;
  constructor(private categoriesService: CategoriesService) { }


  ngOnInit(): void {
    this.currentCategory = this.categoriesService.get(parseInt(this.id));
  }
}
