import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Filter } from '../../components/filter/filter';
import { MenuList } from '../../components/menu-list/menu-list';
import { DishDetail } from '../../components/dish-detail/dish-detail';
import { Dish, DishFilter } from '../../core/models/dish';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastSuccess } from '../../components/toast-success/toast-success';
import { ToastError } from '../../components/toast-error/toast-error';
import { RestaurantService, Restaurant } from '../../core/services/restaurant';

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
export class Home implements OnInit {
  @ViewChild(ToastSuccess) toastSuccess!: ToastSuccess;
  @ViewChild(ToastError) toastError!: ToastError;

  currentFilter: DishFilter = {};
  showFilter: boolean = false;
  restaurantName: string = 'Yakalma'; // Default value
  restaurantId: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId') || '';
    this.loadRestaurantName();
  }

  private loadRestaurantName() {
    if (this.restaurantId) {
      this.restaurantService.getRestaurantById(this.restaurantId).subscribe({
        next: (restaurant: Restaurant) => {
          this.restaurantName = restaurant.name || 'Yakalma';
        },
        error: (error) => {
          console.error('Erreur lors du chargement du nom du restaurant:', error);
          // Keep default name
        }
      });
    }
  }

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
