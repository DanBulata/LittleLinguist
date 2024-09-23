import { Component, OnInit } from '@angular/core';
import { GameResult } from '../../shared/model/Game-Result';
import { GameResultService } from '../services/game-result.service';
import { GameResultCardComponent } from "../game-result-card/game-result-card.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GameResultCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

//   import { Component, OnInit } from '@angular/core';
// import { MatCardModule } from '@angular/material/card';
// import { CommonModule } from '@angular/common';
// import { gameProfile } from '../../shared/model/game-profile';
// import { GamesInfoService } from '../services/games-info.service';
// import { GameCardComponent } from "../game-card/game-card.component";

// @Component({
//   selector: 'app-lets-play',
//   standalone: true,
//   imports: [MatCardModule, CommonModule, GameCardComponent],
//   templateUrl: './lets-play.component.html',
//   styleUrl: './lets-play.component.css',
// })

// export class LetsPlayComponent implements OnInit {
  gamesResult: GameResult[] = [];

  constructor(private gameResultService: GameResultService) { }

//   ngOnInit(): void {
//     this.gamesResult = this.gameResultService.list()
//   }



// }

// export class DashboardComponent implements OnInit {
//   gamesResult: GameResult[] = [];

//   constructor(private gameResultService: GameResultService) {}

  ngOnInit(): void {
    this.gameResultService.list().then((results) => {
      this.gamesResult = results;
    });
  }
}