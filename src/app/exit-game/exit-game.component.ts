import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ExitDialogComponent } from '../exit-dialog/exit-dialog.component';

@Component({
  selector: 'app-exit-game',
  standalone: true,
  imports: [MatIconModule,CommonModule,MatToolbarModule,RouterModule],
  templateUrl: './exit-game.component.html',
  styleUrl: './exit-game.component.css'
})
export class ExitGameComponent {

  dialog = inject(MatDialog)

  openDialog(): void {
    
    const dialogRef = this.dialog.open(ExitDialogComponent)
  }

}
