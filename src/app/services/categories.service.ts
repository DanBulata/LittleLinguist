import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { categoryConverter } from './converters/category-converter';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: Firestore) {}

  list(): Category[] {
    return [];
  }

  get(id: string): Category | undefined {
    return undefined;
  }

  delete(id: string): void {}

  update(category: Category): void {}

  async add(category: Category): Promise<void> {
    const categoryColllection = collection(
      this.firestore,
      'categories'
    ).withConverter(categoryConverter);
    await addDoc(categoryColllection, category);
  }
}
