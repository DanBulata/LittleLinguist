import { Timestamp } from '@angular/fire/firestore';
import { Category } from '../../../shared/model/category';
import { Language } from '../../../shared/model/language';

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
      lastUpdateDate: Timestamp.fromDate(categoryToSave.lastUpdateDate),
    };
  },

  fromFirestore: () => {
    return new Category("","",Language.English,Language.Hebrew)
  },
};
