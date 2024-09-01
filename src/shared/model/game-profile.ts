export class gameProfile {
    gameId: number;
    gameName: string;
    gameDescription: string;
    gameURL: string;


    constructor(gameId: number, gameName: string, gameDescription: string, gameURL: string) {
        this.gameId = gameId;
        this.gameName = gameName;
        this.gameDescription = gameDescription;
        this.gameURL = gameURL;
    }
}


// const mixedLetters = new gameProfile(1, "Mixed letters", "Practice spelling, by finding the right order of letters for every word in the category", "MixedLetters");

// const wordSorter = new gameProfile(2, "Word sorter", "list words that fit into particular categories", "SortGame");