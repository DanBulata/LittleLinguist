import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exit-dialog',
  standalone: true,
  imports: [MatButtonModule,MatDialogContent,MatDialogActions,MatDialogClose],
  templateUrl: './exit-dialog.component.html',
  styleUrl: './exit-dialog.component.css'
})
export class ExitDialogComponent {
  constructor(private router: Router, private dialogRef: MatDialogRef<ExitDialogComponent>) {}

  navigateAndClose(): void {
    // Close the dialog first
    this.dialogRef.close();
    
    // Then navigate to the desired page
    this.router.navigate(['/letsPlay']);
  }

}





 

  
