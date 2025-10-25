import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DishDetailPage } from './pages/dish-detail-page/dish-detail-page';

export const routes: Routes = [

  { path: '', component: Home },
  { path: 'dish/:id', component: DishDetailPage },
];
