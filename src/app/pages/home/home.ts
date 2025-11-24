import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Filter } from '../../components/filter/filter';
import { MenuList } from '../../components/menu-list/menu-list';
import { DishDetail } from '../../components/dish-detail/dish-detail';
import { Dish, DishFilter } from '../../core/models/dish';
import { Router } from '@angular/router';
import { ToastSuccess } from '../../components/toast-success/toast-success';
import { ToastError } from '../../components/toast-error/toast-error';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    Filter,
    MenuList,
    ToastSuccess,
    ToastError
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  @ViewChild(ToastSuccess) toastSuccess!: ToastSuccess;
  @ViewChild(ToastError) toastError!: ToastError;

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
        this.toastSuccess.show('Commande ajoutée avec succès');
      } else {
        this.toastError.show('Erreur lors de l\'ajout de la commande');
      }
    });
  }
}
