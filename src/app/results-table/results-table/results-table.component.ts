import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TranslatedWord } from '../../../shared/model/translated-word';

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
export class ResultsTableComponent implements OnInit {
  displayedColumns: string[] = ['origin', 'target', 'correct'];
  @Input() dataSource: ResultRow[] = [];
  @Input() showTarget: boolean = true
  @Input () grade?: number;
  @Input() countCorretGuesses?:number;
  @Input () numOfTries?: number;

  ngOnInit(): void {
    if (!this.showTarget) {
      this.displayedColumns = this.displayedColumns.filter(column => column !== "target")
    }
  }

}

