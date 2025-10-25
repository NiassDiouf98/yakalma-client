import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Filter } from '../../components/filter/filter';
import { MenuList } from '../../components/menu-list/menu-list';
import { DishDetail } from '../../components/dish-detail/dish-detail';
import { Dish, DishFilter } from '../../core/models/dish';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    Filter,
    MenuList
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  currentFilter: DishFilter = {};
  showFilter: boolean = false;

  constructor(private router: Router, private dialog: MatDialog) {}

  onFilterChanged(filter: DishFilter) {
    this.currentFilter = filter;
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  onDishSelected(dish: Dish) {
    // Open dish detail modal
    const dialogRef = this.dialog.open(DishDetail, {
      data: dish,
      width: '90vw',
      maxWidth: '600px',
      panelClass: 'dish-detail-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle adding to cart
        console.log('Ajouter au panier:', result);
      }
    });
  }
}
