import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { GameProfile } from '../../shared/model/game-profile';
import { GamesInfoService } from '../services/game-info.service';
import { GameCardComponent } from "../game-card/game-card.component";

@Component({
  selector: 'app-lets-play',
  standalone: true,
  imports: [MatCardModule, CommonModule, GameCardComponent],
  templateUrl: './lets-play.component.html',
  styleUrl: './lets-play.component.css',
})

export class LetsPlayComponent implements OnInit {
  games: GameProfile[] = [];

  constructor(private gamesInfoService: GamesInfoService) { }

  ngOnInit(): void {
    this.games = this.gamesInfoService.list()
  }



}
