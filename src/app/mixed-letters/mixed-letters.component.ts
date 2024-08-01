import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../../shared/model/category';

@Component({
  selector: 'app-mixed-letters',
  standalone: true,
  imports: [],
  templateUrl: './mixed-letters.component.html',
  styleUrl: './mixed-letters.component.css'
})
export class MixedLettersComponent implements OnInit {
  @Input()
  id = "";
  currentCategory?: Category;
  constructor(private categoriesService: CategoriesService) { }


  ngOnInit(): void {
    this.currentCategory = this.categoriesService.get(parseInt(this.id));
  }
}

