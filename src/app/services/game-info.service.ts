import { Injectable } from '@angular/core';
import { gameProfile } from '../../shared/model/game-profile';


@Injectable({
  providedIn: 'root'
})
export class GamesInfoService {
  private games: gameProfile[] = [
    new gameProfile(
      1,
      "Mixed words",
      "Practice spelling, by finding the right order of letters for every word in the category",
      "mixedLetters"
    ),

    new gameProfile(
      2,
      "Word sorter",
      "list words that fit into particular categories",
      "wordSorter"
    )

  ];

  constructor() { }

  list(): gameProfile[] {
    return this.games;
  }
}

