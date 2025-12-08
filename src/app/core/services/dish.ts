import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Dish, DishCategory, DishFilter } from '../models/dish';
@Injectable({
  providedIn: 'root'
})
export class DishService {
  private apiUrl = `${environment.apiUrl}/restaurants/menu/restaurant`;

  constructor(private http: HttpClient) {}
  getAllDishes(restaurantId: string): Observable<Dish[]> {
    return this.http.get<{ menu: any[] }>(`${this.apiUrl}/${restaurantId}`).pipe(
      map(response => this.mapMenuItemsToDishes(response.menu))
    );
  }

  private mapMenuItemsToDishes(menuItems: any[]): Dish[] {
    return menuItems.map(item => ({
      id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      supplements: item.supplements ? item.supplements : [],
      quantity: item.quantity || 1
    }));
  }
  getDishById(id: string, restaurantId: string): Observable<Dish | undefined> {
    return this.http.get<{ menu: any[] }>(`${this.apiUrl}/${restaurantId}`).pipe(
      map(response => {
        const menuItems = this.mapMenuItemsToDishes(response.menu);
        return menuItems.find(dish => dish.id === id);
      })
    );
  }
  getDishesByCategory(restaurantId: string): Observable<Dish[]> {
    // Since backend doesn't have categories, return all dishes
    return this.getAllDishes(restaurantId);
  }
  applyFilters(filter: DishFilter, restaurantId: string): Observable<Dish[]> {
    return this.getAllDishes(restaurantId).pipe(
      map(dishes => {
        let filtered = [...dishes];
        // if (filter.category) {
        //   filtered = filtered.filter(d => d.category === filter.category);
        // }
        if (filter.minPrice !== undefined) {
          filtered = filtered.filter(d => d.price >= filter.minPrice!);
        }
        if (filter.maxPrice !== undefined) {
          filtered = filtered.filter(d => d.price <= filter.maxPrice!);
        }
        if (filter.searchTerm) {
          const term = filter.searchTerm.toLowerCase();
          filtered = filtered.filter(d =>
            d.name.toLowerCase().includes(term) ||
            d.description.toLowerCase().includes(term)
            //  ||
            // d.ingredients.some(ing => ing.toLowerCase().includes(term))
          );
        }
        // if (filter.isAvailable !== undefined) {
        //   filtered = filtered.filter(d => d.isAvailable === filter.isAvailable);
        // }
        return filtered;
      })
    );
  }
  getCategories(): DishCategory[] {
    // Since backend doesn't have categories, return empty array
    return [];
  }
  // Method for infinite scroll - returns next batch
  getNextBatch(currentLength: number, restaurantId: string, batchSize: number = 10): Observable<Dish[]> {
    const startIndex = currentLength;
    const endIndex = startIndex + batchSize;
    return this.getAllDishes(restaurantId).pipe(
      map(dishes => dishes.slice(startIndex, endIndex))
    );
  }
}
