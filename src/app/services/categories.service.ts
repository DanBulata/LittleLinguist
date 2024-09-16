// import { Injectable } from '@angular/core';
// import { Category } from '../../shared/model/category';
// import { addDoc, collection, Firestore } from '@angular/fire/firestore';
// import { categoryConverter } from './converters/category-converter';

// @Injectable({
//   providedIn: 'root',
// })
// export class CategoriesService {
//   constructor(private firestore: Firestore) {}

//   list(): Category[] {
//     return [];
//   }

//   get(id: string): Category | undefined {
//     return undefined;
//   }

//   delete(id: string): void {}

//   update(category: Category): void {}

//   async add(category: Category): Promise<void> {
//     const categoryColllection = collection(
//       this.firestore,
//       'categories'
//     ).withConverter(categoryConverter);
//     await addDoc(categoryColllection, category);
//   }
// }

/*
הצעה נוספת
import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import { addDoc, collection, doc, deleteDoc, updateDoc, getDoc, getDocs, Firestore } from '@angular/fire/firestore';
import { categoryConverter } from './converters/category-converter';


@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categoryCollection = collection(this.firestore, 'categories').withConverter(categoryConverter);

  constructor(private firestore: Firestore) {}

  async list(): Promise<Category[]> {
    const categorySnapshot = await getDocs(this.categoryCollection);
    return categorySnapshot.docs.map((doc) => doc.data());
  }

  async get(id: string): Promise<Category | undefined> {
    const categoryDocRef = doc(this.firestore, `categories/${id}`).withConverter(categoryConverter);
    const categoryDoc = await getDoc(categoryDocRef);
    return categoryDoc.exists() ? categoryDoc.data() : undefined;
  }

  async delete(id: string): Promise<void> {
    const categoryDocRef = doc(this.firestore, `categories/${id}`);
    await deleteDoc(categoryDocRef);
  }

  async update(category: Category): Promise<void> {
    const categoryDocRef = doc(this.firestore, `categories/${category.id}`).withConverter(categoryConverter);
    await updateDoc(categoryDocRef, { ...category });
  }

  async add(category: Category): Promise<void> {
    await addDoc(this.categoryCollection, category);
  }
}

*/

import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, getDoc,  DocumentSnapshot, QuerySnapshot, setDoc } from '@angular/fire/firestore';
import { categoryConverter } from './converters/category-converter';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: Firestore) {}

  // async list(): Promise<Category[]> {
  //   const categoryCollection = collection(this.firestore, 'categories').withConverter(categoryConverter);
  //   const categorySnapshot = await getDocs(categoryCollection);
  //   return categorySnapshot.docs.map(doc => doc.data());
  // }
      // return categorySnapshot.docs.map(doc => doc.data());

  async list(): Promise<Category[]> {
    const categoryCollection = collection(this.firestore, 'categories').withConverter(categoryConverter)
    const QuerySnapshot: QuerySnapshot<Category> = await getDocs(categoryCollection)
    const result: Category[] = [];

    QuerySnapshot.docs.forEach((docSnap: DocumentSnapshot<Category>)=>{
      const data = docSnap.data();
      if(data){ 
        result.push(data)
      }
    })
    return result
    }

  



  async get(id: string): Promise<Category | undefined> {
    const categoryDocRef = doc(this.firestore, 'categories', id).withConverter(categoryConverter);
    // const categoryDoc = await getDoc(categoryDocRef);
    // return categoryDoc.exists() ? categoryDoc.data() : undefined;
    return (await getDoc(categoryDocRef)).data()
  }

  async delete(currentCategoryId: string): Promise<void> {
    const categoryDocRef = doc(this.firestore, 'categories', currentCategoryId).withConverter(categoryConverter);
    return deleteDoc(categoryDocRef);
  }


  async update(currentCategory: Category): Promise<void> {
    const categoryDocRef = doc(this.firestore, 'categories', currentCategory.id).withConverter(categoryConverter);
    // await updateDoc(categoryDocRef, { ...category });
    return setDoc (categoryDocRef , currentCategory)
  }

  async add(category: Category): Promise<void> {
    const categoryCollection = collection(this.firestore, 'categories').withConverter(categoryConverter);
    await addDoc(categoryCollection, category);
  }
}
