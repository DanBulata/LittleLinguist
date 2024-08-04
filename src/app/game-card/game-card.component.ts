import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { SelectGameDialogComponent } from '../select-category-dialog/select-category-dialog.component';
import { gameProfile } from '../../shared/model/game-profile';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})

export class GameCardComponent {
  @Input()
  games: any;

  dialog = inject(MatDialog)

  openDialog(game: gameProfile): void {
    const dialogRef = this.dialog.open(SelectGameDialogComponent, { data: game })
  }
}
