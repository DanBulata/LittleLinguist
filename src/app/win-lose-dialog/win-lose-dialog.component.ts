import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-win-lose-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './win-lose-dialog.component.html',
  styleUrl: './win-lose-dialog.component.css'
})
export class WinLoseDialogComponent {
  isSuccess: any;

  constructor(private dialogRef: MatDialogRef<WinLoseDialogComponent>,   @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isSuccess = data.isSuccess;
  }

   
  
  nextStep() {
    // Close the dialog first
    this.dialogRef.close();

   // rest of code... close, nextWuestion, updateProgressBar
   
  }
}




