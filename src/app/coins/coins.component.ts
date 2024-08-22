import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CoinsService } from '../services/coins.service';

@Component({
  selector: 'app-coins',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './coins.component.html',
  styleUrl: './coins.component.css'
})
export class CoinsComponent {

  constructor(private coinsService: CoinsService) {}

  getCoins() {
    return this.coinsService.get()
  }
}
