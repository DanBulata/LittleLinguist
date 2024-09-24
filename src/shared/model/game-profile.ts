export class GameProfile {
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
