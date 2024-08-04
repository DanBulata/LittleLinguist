import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { LetsPlayComponent } from './lets-play/lets-play.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpSectionComponent } from './help-section/help-section.component';
import { MixedLettersComponent } from './mixed-letters/mixed-letters.component';
import { WordSorterComponent } from './word-sorter/word-sorter.component';



export const routes: Routes = [
    { path: "", component: DashboardComponent },
    { path: "admin", component: CategoriesListComponent },
    { path: "category/:id", component: CategoryFormComponent },
    { path: "newcategory", component: CategoryFormComponent },
    { path: "letsPlay", component: LetsPlayComponent },
    { path: "help", component: HelpSectionComponent },
    { path: "mixedLetters/:id", component: MixedLettersComponent },
    { path: "wordSorter/:id", component: WordSorterComponent },
];
