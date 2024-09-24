import { Component, OnInit } from '@angular/core';
import { GameResult } from '../../shared/model/Game-Result';
import { GameResultService } from '../services/game-result.service';
import { GameResultCardComponent } from '../game-result-card/game-result-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GameResultCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  gamesResult: GameResult[] = [];

  constructor(private gameResultService: GameResultService) {}

  ngOnInit(): void {
    this.gameResultService.list().then((results) => {
      this.gamesResult = results;
    });
  }
}
