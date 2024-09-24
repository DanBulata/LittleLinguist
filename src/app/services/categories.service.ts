import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  getDoc,
  DocumentSnapshot,
  QuerySnapshot,
  setDoc,
} from '@angular/fire/firestore';
import { categoryConverter } from './converters/category-converter';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: Firestore) {}

  async list(): Promise<Category[]> {
    const categoryCollection = collection(
      this.firestore,
      'categories'
    ).withConverter(categoryConverter);
    const QuerySnapshot: QuerySnapshot<Category> = await getDocs(
      categoryCollection
    );
    const result: Category[] = [];

    QuerySnapshot.docs.forEach((docSnap: DocumentSnapshot<Category>) => {
      const data = docSnap.data();
      if (data) {
        result.push(data);
      }
    });
    return result;
  }

  async get(id: string): Promise<Category | undefined> {
    const categoryDocRef = doc(this.firestore, 'categories', id).withConverter(
      categoryConverter
    );
    return (await getDoc(categoryDocRef)).data();
  }

  async delete(currentCategoryId: string): Promise<void> {
    const categoryDocRef = doc(
      this.firestore,
      'categories',
      currentCategoryId
    ).withConverter(categoryConverter);
    return deleteDoc(categoryDocRef);
  }

  async update(currentCategory: Category): Promise<void> {
    const categoryDocRef = doc(
      this.firestore,
      'categories',
      currentCategory.id
    ).withConverter(categoryConverter);

    return setDoc(categoryDocRef, currentCategory);
  }

  async add(category: Category): Promise<void> {
    const categoryCollection = collection(
      this.firestore,
      'categories'
    ).withConverter(categoryConverter);
    await addDoc(categoryCollection, category);
  }
}
