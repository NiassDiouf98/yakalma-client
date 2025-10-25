import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { DishCategory, DishFilter } from '../../core/models/dish';
import { DishService } from '../../core/services/dish';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    NgSelectModule
  ],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  @Output() filterChanged = new EventEmitter<DishFilter>();

  categories: DishCategory[] = [];
  categoriesWithAll: { value: DishCategory | ''; label: string }[] = [];
  selectedCategory: DishCategory | '' = '';
  searchTerm: string = '';
  minPrice: number = 0;
  maxPrice: number = 50;
  showAvailableOnly: boolean = false;

  constructor(private dishService: DishService) {
    this.categories = this.dishService.getCategories();
    this.categoriesWithAll = [
      { value: '', label: 'Toutes les catégories' },
      ...this.categories.map(c => ({ value: c, label: c }))
    ];
  }

  onFilterChange() {
    const filter: DishFilter = {
      category: this.selectedCategory || undefined,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      searchTerm: this.searchTerm || undefined,
      isAvailable: this.showAvailableOnly || undefined
    };
    this.filterChanged.emit(filter);
  }

  clearFilters() {
    this.selectedCategory = '';
    this.searchTerm = '';
    this.minPrice = 0;
    this.maxPrice = 50;
    this.showAvailableOnly = false;
    this.onFilterChange();
  }

  formatPrice(value: number): string {
    return `${value}€`;
  }
}
