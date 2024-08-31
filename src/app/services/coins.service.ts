import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoinsService {
  private readonly COINS_KEY = 'coins';

  private getCoins(): number {
    const coins = localStorage.getItem(this.COINS_KEY);
    if (coins !== null && !isNaN(parseInt(coins, 10))) {
      return parseInt(coins, 10);
    }

    return 0;
  }

  private setCoins(coins: number): void {
    localStorage.setItem(this.COINS_KEY, coins.toString());
  }

  get() {
    return this.getCoins();
  }

  set(coins: number) {
    this.setCoins(coins);
  }
}
