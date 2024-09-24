import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/game-profile';


@Injectable({
  providedIn: 'root'
})
export class GamesInfoService {
  private games: GameProfile[] = [
    new GameProfile(
      1,
      "Mixed letters",
      "Practice spelling, by finding the right order of letters for every word in the category",
      "mixedLetters"
    ),

    new GameProfile(
      2,
      "Word sorter",
      "list words that fit into particular categories",
      "wordSorter"
    )

  ];

  constructor() { }

  list(): GameProfile[] {
    return this.games;
  }
}

