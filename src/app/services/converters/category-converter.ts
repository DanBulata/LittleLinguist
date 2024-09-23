import { QueryDocumentSnapshot,  SnapshotOptions, Timestamp } from '@angular/fire/firestore';
import { Category } from '../../../shared/model/category';
import { TranslatedWord } from '../../../shared/model/translated-word';
// import { Language } from '../../../shared/model/language';
export const categoryConverter = {
  toFirestore: (categoryToSave: Category) => {
    const wordsArr = [];
    for (let i = 0; i < categoryToSave.words.length; i++) {
      wordsArr.push({
        origin: categoryToSave.words[i].origin,
        target: categoryToSave.words[i].target,
      });
    }
    return {
      name: categoryToSave.name,
      origin: categoryToSave.origin,
      target: categoryToSave.target,
      lastUpdateDate: Timestamp.fromDate(categoryToSave.lastUpdateDate).toDate(),
      words: wordsArr   
    };
  },
fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options)
    const category = new Category(
      snapshot.id,
      data['name'],        
      data['origin'],
      data['target']
    )
    const words = data['words'];
  if (words) {
    for (let i = 0; i < words.length; ++i) {
      category.words.push(new TranslatedWord(words[i].origin, words[i].target));
    }
  }
    category.lastUpdateDate = data['lastUpdateDate'].toDate()
    return category
  }
  
};