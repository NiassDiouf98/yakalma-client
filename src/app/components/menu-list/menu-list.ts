import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Dish, DishFilter } from '../../core/models/dish';
import { DishService } from '../../core/services/dish';
import { AnimateDirective } from '../../core/directives/animate';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    AnimateDirective
  ],
  templateUrl: './menu-list.html',
  styleUrl: './menu-list.css',
})
export class MenuList implements OnInit, OnDestroy {
  @Input() filter: DishFilter = {};
  @Input() restaurantId: string = '';
  @Output() dishSelected = new EventEmitter<Dish>();

  dishes: Dish[] = [];
  displayedDishes: Dish[] = [];
  isLoading = false;
  hasMoreData = true;
  private destroy$ = new Subject<void>();
  private filterSubject = new BehaviorSubject<DishFilter>({});

  // Virtual scroll settings
  itemSize = 200;
  minBufferPx = 400;
  maxBufferPx = 800;

  constructor(private dishService: DishService) {}

  ngOnInit() {
    this.loadInitialDishes();

    // Subscribe to filter changes
    this.filterSubject.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(filter => {
      this.applyFilter(filter);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges() {
    if (this.filter) {
      this.filterSubject.next(this.filter);
    }
  }

  private loadInitialDishes() {
    this.isLoading = true;
    this.dishService.getAllDishes(this.restaurantId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (dishes) => {
        this.dishes = dishes;
        this.displayedDishes = [...dishes];
        this.isLoading = false;
        this.hasMoreData = dishes.length >= 10; // Assuming batch size of 10
      },
      error: (error) => {
        console.error('Error loading dishes:', error);
        this.isLoading = false;
      }
    });
  }

  private applyFilter(filter: DishFilter) {
    this.dishService.applyFilters(filter, this.restaurantId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (filteredDishes) => {
        this.displayedDishes = [...filteredDishes];
        this.hasMoreData = filteredDishes.length >= 10;
      },
      error: (error) => {
        console.error('Error applying filters:', error);
      }
    });
  }

  onScrollEnd() {
    if (!this.isLoading && this.hasMoreData) {
      this.loadMoreDishes();
    }
  }

  private loadMoreDishes() {
    this.isLoading = true;
    this.dishService.getNextBatch(this.displayedDishes.length, this.restaurantId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (newDishes) => {
        if (newDishes.length > 0) {
          this.displayedDishes = [...this.displayedDishes, ...newDishes];
        } else {
          this.hasMoreData = false;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading more dishes:', error);
        this.isLoading = false;
      }
    });
  }

  onDishClick(dish: Dish) {
    this.dishSelected.emit(dish);
  }

  trackByDishId(index: number, dish: Dish): string {
    return dish.id;
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'Entrée': 'primary',
      'Plat Principal': 'accent',
      'Dessert': 'warn',
      'Boisson': 'primary',
      'Accompagnement': 'accent'
    };
    return colors[category] || 'basic';
  }
}
