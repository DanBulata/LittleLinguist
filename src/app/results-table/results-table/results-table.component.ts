import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

export interface ResultRow {
  origin: string
  target?: string
  correct: boolean
}

@Component({
  selector: 'app-results-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule],
  templateUrl: './results-table.component.html',
  styleUrl: './results-table.component.css'
})
export class ResultsTableComponent {
  displayedColumns: string[] = ['origin', 'correct'];
  @Input() dataSource: ResultRow[] = [];
}
