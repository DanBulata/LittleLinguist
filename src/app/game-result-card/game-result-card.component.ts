import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameResult } from '../../shared/model/Game-Result';
import { CoinsComponent } from '../coins/coins.component';
import { CoinsService } from '../services/coins.service';
import { GameResultService } from '../services/game-result.service';
import { CategoriesService } from '../services/categories.service';
import { GamesInfoService } from '../services/game-info.service';
import { CategoriesListComponent } from '../categories-list/categories-list.component';


@Component({
  selector: 'app-game-result-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, CoinsComponent, CategoriesListComponent],
  templateUrl: './game-result-card.component.html',
  styleUrl: './game-result-card.component.css'
})
export class GameResultCardComponent {
  @Input()
  gameresults: GameResult[]=[];
  gamesCollection: GameResult[] = [];

  gameCount: number = 0;
  perfectGamesPercentage: number = 0;
  learnedCategoriesCount: number = 0;
  totalCategoriesCount: number = 0; // משתנה חדש לאחסן את מספר הקטגוריות הכולל
  learnedCategoriesPercentage: number = 0; // משתנה חדש לאחסן את אחוז הקטגוריות שנלמדו
  categoriesYetToLearn: number = 0;
  mostPlayedCategoryName: string = '';
  mostPlayedCategoryId: string = '';
  

  constructor(
    private coinsService: CoinsService,
    private gameResultService: GameResultService,
    private categoriesService :CategoriesService,
    private gamesInfoService: GamesInfoService // Inject GamesInfoService
      
    
  ) {}

  ngOnInit(): void {
    this.countGames()
    this.PerfectGames()
    this.countLearnedCategories()
    // this.calculateTotalCategories()
    this.LearntCategoriesPercentage(); // חישוב אחוז הקטגוריות שנלמדו
    this.countYetToLearnCategories()
    this.mostPlayedCategory();
          }
       
      
   
  

  getCoins() {
    return this.coinsService.get()
  }

  countGames(): Promise<void> {
    return this.gameResultService.list().then((results) => {
      this.gameresults = results;
      this.gameCount = this.gameresults.length; 
    });
  }

async PerfectGames(): Promise<number> {
  const results = await this.gameResultService.list();
  this.gameresults = results;

  if (results.length === 0) {
    this.perfectGamesPercentage = 0; // Set the percentage to 0 if no results
  } else {
    // Count the number of perfect games (score 100)
    let perfectGamesCount = 0;
    results.forEach((game) => {
      if (game.numOfPoints === 100) {
        perfectGamesCount++;
      }
    });

    // Calculate the percentage of perfect games
    this.perfectGamesPercentage = parseFloat(((perfectGamesCount / results.length) * 100).toFixed(1));
  }             

  return this.perfectGamesPercentage;
}

async countLearnedCategories(): Promise<number> {
  const results = await this.gameResultService.list();
  const learnedCategories: string[] = []; // מערך לשמירת הקטגוריות

  results.forEach(game => {
    // אם הקטגוריה עדיין לא קיימת במערך, מוסיפים אותה
    if (!learnedCategories.includes(game.idCategory)) {
      learnedCategories.push(game.idCategory);
    }
  });
  this.learnedCategoriesCount = learnedCategories.length
  // const countLearnedCategories = learnedCategories.length
  return this.learnedCategoriesCount; // מחזירים את מספר הקטגוריות הייחודיות
}

// calculateLearnedCategoriesPercentage(): void {
//   if (this.totalCategoriesCount > 0) {
//     this.learnedCategoriesPercentage = parseFloat(((this.learnedCategoriesCount / this.totalCategoriesCount) * 100).toFixed(1));
//   } else {
//     this.learnedCategoriesPercentage = 0;
//   }
// }

 
  // פונקציה חדשה לחישוב הקטגוריות הכוללות
  async LearntCategoriesPercentage(): Promise<number> {
    const results = await this.categoriesService.list();
    const totalCategories: string[] = []; // מערך לשמירת הקטגוריות הייחודיות

    results.forEach((game) => {
      if (!totalCategories.includes(game.id)) {
        totalCategories.push(game.id);
      }
    });

    this.totalCategoriesCount = totalCategories.length; // מספר הקטגוריות הכוללות
    // return this.totalCategoriesCount
    // this.LearntCategoriesPercentage()
    if (this.totalCategoriesCount > 0) {
      this.learnedCategoriesPercentage = parseFloat(((this.learnedCategoriesCount / this.totalCategoriesCount) * 100).toFixed(1));
    } else {
      this.learnedCategoriesPercentage = 0;
    }
   return this.learnedCategoriesPercentage;
  //  this.calculateTotalCategories()
  }

  // פונקציה חדשה לחישוב אחוז הקטגוריות שנלמדו
  // LearntCategoriesPercentage() {
  //   if (this.totalCategoriesCount > 0) {
  //     this.learnedCategoriesPercentage = parseFloat(((this.learnedCategoriesCount / this.totalCategoriesCount) * 100).toFixed(1));
  //   } else {
  //     this.learnedCategoriesPercentage = 0;
  //   }
  //  return this.learnedCategoriesPercentage;
  // //  this.calculateTotalCategories()
  // }

  // New function to calculate categories yet to learn
  async countYetToLearnCategories(): Promise<number> {
    // Ensure totalCategoriesCount and learnedCategoriesCount are up-to-date
    await this.LearntCategoriesPercentage();

    // Calculate categories yet to learn
    const categoriesYetToLearn = this.totalCategoriesCount - this.learnedCategoriesCount;

    // Ensure the count is non-negative
    this.categoriesYetToLearn = categoriesYetToLearn > 0 ? categoriesYetToLearn : 0;

    return this.categoriesYetToLearn;
  }
  
  // async mostPlayedCategory(): Promise<string> {
  //   const results = await this.gameResultService.list();

  // async mostPlayedCategory(): Promise<string> {
  //   // Step 1: Retrieve game results
  //   const results = await this.gameResultService.list();
  //   const resultsArr: string[] = []
  
  //   let mostPlayedCategoryId = ""; // Variable to store the most played category ID
  //   let highestCount = 0; // Variable to store the highest count of occurrences
  
  //   // Step 2: Loop through results to find the most played category
  //   results.forEach(game => {
  //     const categoryId = game.idCategory;
  //     let currentCount = 0; // Initialize count for the current category
  
  //     // Count occurrences of the current category in the results
  //     results.forEach(innerGame => {
  //       if (innerGame.idCategory === categoryId) {
  //         currentCount++;
  //       }
  //     });
  
  //     // Check if the current category has the highest count
  //     if (currentCount > highestCount) {
  //       highestCount = currentCount;
  //       mostPlayedCategoryId = categoryId;
  //     }
  //   });
  
  //   // Step 3: Retrieve the name of the most played category using the GamesInfoService
  //   // const gamesInfo = await this.gamesInfoService.list();
  //   // const mostPlayedGame = gamesInfo.find(game => game.id === mostPlayedCategoryId);
  
  //   // return mostPlayedGame ? mostPlayedGame.name : "No category found"; // Return the category name or a fallback message
  // return mostPlayedCategoryId
  // }

  // async mostPlayedCategory(): Promise<string> {
  //   // Step 1: Retrieve game results
  //   const results = await this.gameResultService.list();
  
  //   let mostPlayedCategoryId = ""; // Variable to store the most played category ID
  //   let highestCount = 0; // Variable to store the highest count of occurrences
  //   const resultsArr: string[] = []; // Array to hold category IDs
  
  //   // Step 2: Fill resultsArr with category IDs
  //   results.forEach(game => {
  //     resultsArr.push(game.idCategory); // Add each category ID to resultsArr
  //   });
  
  //   // Loop through resultsArr to find the most played category
  //   resultsArr.forEach(categoryId => {
  //     let currentCount = 0; // Initialize count for the current category
  
  //     // Count occurrences of the current category in resultsArr
  //     resultsArr.forEach(innerCategoryId => {
  //       if (innerCategoryId === categoryId) {
  //         currentCount++;
  //       }
  //     });
  
  //     // Check if the current category has the highest count
  //     if (currentCount > highestCount) {
  //       highestCount = currentCount;
  //       mostPlayedCategoryId = categoryId; // Update the most played category ID
  //     }
  //   });
  
  //   // Step 3: Retrieve the name of the most played category using the GamesInfoService
  //   const gamesInfo = await this.gamesInfoService.list();
  //   const mostPlayedGame = gamesInfo.find(game => game.id === mostPlayedCategoryId);
  
  //   return mostPlayedGame ? mostPlayedGame.name : "No category found"; // Return the category name or a fallback message
  // }
  

  // async mostPlayedCategory(): Promise<string> {
  //   // Step 1: Retrieve game results
  //   const results = await this.gameResultService.list();
  
  //   // let mostPlayedCategoryId = ""; // Variable to store the most played category ID
  //   let highestCount = 0; // Variable to store the highest count of occurrences
  //   const resultsArrStr: string[] = []; // Array to hold category IDs
  //   // const resultsArrObj: string[] = []; // Array to hold category Objects


  
  //   // Step 2: Fill resultsArr with category IDs
  //   results.forEach(game => {
  //     resultsArrStr.push(game.idCategory); // Add each category ID to resultsArr
  //   });
  
  //   // Loop through resultsArr to find the most played category
  //   for (let i = 0; i < resultsArrStr.length; i++) {
  //     const categoryId = resultsArrStr[i];
  //     let currentCount = 0; // Initialize count for the current category
  
  //     // Count occurrences of the current category in resultsArr
  //     for (let j = 0; j < resultsArrStr.length; j++) {
  //       if (resultsArrStr[j] === categoryId) {
  //         currentCount++;
  //       }
  //     }
  
  //     // Check if the current category has the highest count
  //     if (currentCount > highestCount) {
  //       highestCount = currentCount;
  //       this.mostPlayedCategoryId = categoryId; // Update the most played category ID
  //     }
  //   }


  //     const categorysList = await this.categoriesService.list();
  //     categorysList.forEach((category) => {
  //        if (category.id===this.mostPlayedCategoryId) {
  //         this.mostPlayedCategoryName =  category.name;  
  //         return this.mostPlayedCategoryName
          
  //        }
  //     })

  //     return "No category found"; // Default return value if no category matches
  //     }


//       const categorysList = await this.categoriesService.list();
// for (const category of categorysList) {
//     if (category.id === this.mostPlayedCategoryId) {
//         return category.name; // Return the category name if found
//     }
// }
// return "No category found";
    // results.forEach(game) => {
    //   if ( this.mostPlayedCategoryId===game.idGame) {
    //     return game.categoryName
    //   }
    // }

  // return this.mostPlayedCategoryId



    // Step 3: Retrieve the name of the most played category using the GamesInfoService
    // const gamesInfo = await this.gamesInfoService.list();
    // const mostPlayedCategory = gamesInfo.find(game => game.gameId === parseInt(mostPlayedCategoryId));
  
    // return mostPlayedCategory ? mostPlayedCategory.gameName : "No category found"; // Return the category name or a fallback message
  
  























    
  //   // Count occurrences of each category
  //   const categoryCount: Record<string, number> = {};
  //   for (const game of results) {
  //     categoryCount[game.idCategory] = (categoryCount[game.idCategory] || 0) + 1;
  //   }
  
  //   // Find the most played category ID
  //   let mostPlayedCategoryId = Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b, "");
  
  //   // Get the category name
  //   const gameProfiles = this.gamesInfoService.list();
  //   const mostPlayedCategory = gameProfiles.find(profile => profile.id === parseInt(mostPlayedCategoryId));
  
  //   return mostPlayedCategory ? mostPlayedCategory.name : 'Unknown';
  // }
  
  


  async mostPlayedCategory(): Promise<string> {
    // Step 1: Retrieve game results
    const results = await this.gameResultService.list();

    let highestCount = 0; // Variable to store the highest count of occurrences
    const resultsArrStr: string[] = []; // Array to hold category IDs

    // Step 2: Fill resultsArr with category IDs
    results.forEach(game => {
        resultsArrStr.push(game.idCategory); // Add each category ID to resultsArr
    });

    // Loop through resultsArr to find the most played category
    for (let i = 0; i < resultsArrStr.length; i++) {
        const categoryId = resultsArrStr[i];
        let currentCount = 0; // Initialize count for the current category

        // Count occurrences of the current category in resultsArr
        for (let j = 0; j < resultsArrStr.length; j++) {
            if (resultsArrStr[j] === categoryId) {
                currentCount++;
            }
        }

        // Check if the current category has the highest count
        if (currentCount > highestCount) {
            highestCount = currentCount;
            this.mostPlayedCategoryId = categoryId; // Update the most played category ID
        }
    }

    const categorysList = await this.categoriesService.list();
    for (const category of categorysList) { // Changed forEach to for..of for direct return
        if (category.id === this.mostPlayedCategoryId) {
            this.mostPlayedCategoryName = category.name;  
            return this.mostPlayedCategoryName; // Return the name when found
        }
    }

    return "No category found"; // Default return value if no category matches
}
}