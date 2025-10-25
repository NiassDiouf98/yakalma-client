import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Dish, DishCategory, DishFilter } from '../models/dish';
@Injectable({
  providedIn: 'root'
})
export class DishService {
  private dishes: Dish[] = [
    {
      id: 1,
      name: 'Salade César',
      description: 'Salade fraîche avec poulet grillé, parmesan et sauce César',
      price: 12.50,
      image: 'assets/salade.jpeg',
      category: DishCategory.ENTREE,
      ingredients: ['Laitue romaine', 'Poulet', 'Parmesan', 'Croûtons', 'Sauce César'],
      supplements: ['Fromage supplémentaire', 'Poulet extra', 'Sauce César extra'],

      isAvailable: true,
      preparationTime: 10,
      rating: 4.5,
      reviewsCount: 25
    },
    {
      id: 2,
      name: 'Pizza Margherita',
      description: 'Pizza classique avec sauce tomate, mozzarella et basilic frais',
      price: 15.00,
      image: 'assets/pizza.avif',
      category: DishCategory.PLAT_PRINCIPAL,
      ingredients: ['Pâte à pizza', 'Sauce tomate', 'Mozzarella', 'Basilic', 'Huile d\'olive'],
      supplements: ['Champignons', 'Olives', 'Pepperoni'],

      isAvailable: true,
      preparationTime: 20,
      rating: 4.8,
      reviewsCount: 45
    },
    {
      id: 3,
      name: 'Yassa Poulet',
      description: 'Poulet mariné au citron et oignons, spécialité sénégalaise',
      price: 18.00,
      image: 'assets/yassa.webp',
      category: DishCategory.PLAT_PRINCIPAL,
      ingredients: ['Poulet', 'Oignons', 'Citron', 'Huile d\'arachide', 'Épices'],
      supplements: ['Kani', 'Pikal', 'Extra oignons'],

      isAvailable: true,
      preparationTime: 25,
      rating: 4.7,
      reviewsCount: 30
    },
    {
      id: 4,
      name: 'Tiramisu',
      description: 'Dessert italien classique avec café et mascarpone',
      price: 8.50,
      image: 'assets/pizzaa.jpg', // Using pizzaa.jpg as dessert image
      category: DishCategory.DESSERT,
      ingredients: ['Mascarpone', 'Café', 'Biscuits', 'Cacao', 'Oeufs'],
      supplements: ['Extra cacao', 'Fruits rouges', 'Chantilly'],

      isAvailable: true,
      preparationTime: 5,
      rating: 4.6,
      reviewsCount: 20
    },
    {
      id: 5,
      name: 'Thiébou Dieune',
      description: 'Riz au poisson, plat traditionnel sénégalais',
      price: 22.00,
      image: 'assets/dieune.webp',
      category: DishCategory.PLAT_PRINCIPAL,
      ingredients: ['Riz', 'Poisson', 'Légumes', 'Huile', 'Épices'],
      supplements: ['Sauce pimentée', 'Extra légumes', 'Poisson supplémentaire'],

      isAvailable: true,
      preparationTime: 30,
      rating: 4.9,
      reviewsCount: 50
    },
    {
      id: 6,
      name: 'Croissant',
      description: 'Croissant frais au beurre',
      price: 3.50,
      image: 'assets/croissant.jpeg',
      category: DishCategory.ACCOMPAGNEMENT,
      ingredients: ['Farine', 'Beurre', 'Lait', 'Levure'],
      supplements: ['Confiture', 'Beurre supplémentaire', 'Miel'],

      isAvailable: true,
      preparationTime: 15,
      rating: 4.4,
      reviewsCount: 15
    },
    {
      id: 7,
      name: 'Griade',
      description: 'Viande grillée épicée, spécialité réunionnaise',
      price: 20.00,
      image: 'assets/griade.webp',
      category: DishCategory.PLAT_PRINCIPAL,
      ingredients: ['Viande', 'Épices réunionnaises', 'Marinade'],
      supplements: ['Sauce piquante', 'Extra viande', 'Accompagnement riz'],

      isAvailable: true,
      preparationTime: 20,
      rating: 4.5,
      reviewsCount: 28
    },
    {
      id: 8,
      name: 'Jus de Maracuja',
      description: 'Jus de fruit de la passion frais',
      price: 5.00,
      image: 'assets/mar.webp',
      category: DishCategory.BOISSON,
      ingredients: ['Fruit de la passion', 'Sucre', 'Eau'],
      supplements: ['Glaçons', 'Menthe fraîche', 'Tranche de citron'],

      isAvailable: true,
      preparationTime: 2,
      rating: 4.3,
      reviewsCount: 12
    },
    {
      id: 9,
      name: 'Poisson Grillé',
      description: 'Poisson frais grillé avec légumes',
      price: 19.00,
      image: 'assets/poisson.jpg',
      category: DishCategory.PLAT_PRINCIPAL,
      ingredients: ['Poisson', 'Légumes', 'Huile d\'olive', 'Herbes'],
      supplements: ['Sauce citronnée', 'Extra légumes', 'Accompagnement riz'],

      isAvailable: true,
      preparationTime: 18,
      rating: 4.6,
      reviewsCount: 22
    },
    {
      id: 10,
      name: 'Riz Blanc',
      description: 'Riz blanc parfumé',
      price: 4.00,
      image: 'assets/riz.png',
      category: DishCategory.ACCOMPAGNEMENT,
      ingredients: ['Riz', 'Eau'],
      supplements: ['Beurre', 'Sauce piquante', 'Légumes sautés'],

      isAvailable: true,
      preparationTime: 15,
      rating: 4.2,
      reviewsCount: 8
    },
    {
      id: 11,
      name: 'Café Expresso',
      description: 'Café italien authentique',
      price: 2.50,
      image: 'assets/cafe.jpeg',
      category: DishCategory.BOISSON,
      ingredients: ['Café moulu', 'Eau'],
      supplements: ['Sucre', 'Lait', 'Chantilly'],

      isAvailable: true,
      preparationTime: 3,
      rating: 4.4,
      reviewsCount: 35
    },
    {
      id: 12,
      name: 'Plat Spécial',
      description: 'Création du chef avec ingrédients frais',
      price: 25.00,
      image: 'assets/plat2.jpg',
      category: DishCategory.PLAT_PRINCIPAL,
      ingredients: ['Ingrédients frais', 'Épices spéciales'],
      supplements: ['Accompagnement au choix', 'Sauce du chef', 'Dessert mini'],

      isAvailable: true,
      preparationTime: 35,
      rating: 4.8,
      reviewsCount: 15
    },
    {
      id: 13,
      name: 'Soupe de Poisson',
      description: 'Soupe traditionnelle aux fruits de mer',
      price: 14.00,
      image: 'assets/poisson.jpg',
      category: DishCategory.ENTREE,
      ingredients: ['Poisson', 'Légumes', 'Crème', 'Herbes'],
      supplements: ['Croûtons', 'Fromage', 'Sauce piquante'],

      isAvailable: true,
      preparationTime: 12,
      rating: 4.3,
      reviewsCount: 18
    },
    {
      id: 14,
      name: 'Glace Vanille',
      description: 'Glace à la vanille maison',
      price: 6.00,
      image: 'assets/salade.jpeg',
      category: DishCategory.DESSERT,
      ingredients: ['Crème', 'Sucre', 'Vanille', 'Oeufs'],
      supplements: ['Chantilly', 'Sauce chocolat', 'Fruits frais'],

      isAvailable: true,
      preparationTime: 2,
      rating: 4.5,
      reviewsCount: 22
    },
    {
      id: 15,
      name: 'Pain aux Olives',
      description: 'Pain frais aux olives et herbes',
      price: 4.50,
      image: 'assets/croissant.jpeg',
      category: DishCategory.ACCOMPAGNEMENT,
      ingredients: ['Farine', 'Olives', 'Herbes', 'Levure'],
      supplements: ['Beurre', 'Fromage', 'Tapenade'],

      isAvailable: true,
      preparationTime: 20,
      rating: 4.1,
      reviewsCount: 10
    }
  ];
  private filteredDishesSubject = new BehaviorSubject<Dish[]>(this.dishes);
  public filteredDishes$ = this.filteredDishesSubject.asObservable();
  constructor() { }
  getAllDishes(): Observable<Dish[]> {
    return of(this.dishes).pipe(delay(500)); // Simulate API delay
  }
  getDishById(id: number): Observable<Dish | undefined> {
    const dish = this.dishes.find(d => d.id === id);
    return of(dish).pipe(delay(300));
  }
  getDishesByCategory(category: DishCategory): Observable<Dish[]> {
    const filtered = this.dishes.filter(d => d.category === category);
    return of(filtered).pipe(delay(300));
  }
  applyFilters(filter: DishFilter): Observable<Dish[]> {
    let filtered = [...this.dishes];
    if (filter.category) {
      filtered = filtered.filter(d => d.category === filter.category);
    }
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
        d.description.toLowerCase().includes(term) ||
        d.ingredients.some(ing => ing.toLowerCase().includes(term))
      );
    }
    if (filter.isAvailable !== undefined) {
      filtered = filtered.filter(d => d.isAvailable === filter.isAvailable);
    }
    this.filteredDishesSubject.next(filtered);
    return of(filtered).pipe(delay(200));
  }
  getCategories(): DishCategory[] {
    return Object.values(DishCategory);
  }
  // Method for infinite scroll - returns next batch
  getNextBatch(currentLength: number, batchSize: number = 10): Observable<Dish[]> {
    const startIndex = currentLength;
    const endIndex = startIndex + batchSize;
    const batch = this.dishes.slice(startIndex, endIndex);
    return of(batch).pipe(delay(500));
  }
}
