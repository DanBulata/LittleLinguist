import { QueryDocumentSnapshot,  SnapshotOptions, Timestamp } from '@angular/fire/firestore';
import { Category } from '../../../shared/model/category';
// import { Language } from '../../../shared/model/language';

export const categoryConverter = {
  toFirestore: (categoryToSave: Category) => {
    const words = [];
    for (let i = 0; i < categoryToSave.words.length; i++) {
      words.push({
        origin: categoryToSave.words[i].origin,
        target: categoryToSave.words[i].target,
      });
    }

    return {
      name: categoryToSave.name,
      origin: categoryToSave.origin,
      target: categoryToSave.target,
      lastUpdateDate: Timestamp.fromDate(categoryToSave.lastUpdateDate).toDate(),  //toDate??
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

    category.lastUpdateDate = data['lastUpdateDate'].toDate()
    return category
  }
  
};
