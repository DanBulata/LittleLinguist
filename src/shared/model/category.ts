import { Language } from "./language";
import { TranslatedWord } from "./translated-word";

export class Category {
    lastUpdateDate = new Date();   //timestamp?
    words: TranslatedWord[] = [];   //array of map?
   

    constructor(public id: string,
        public name: string,
        public origin: Language,
        public target: Language) {
    }
}