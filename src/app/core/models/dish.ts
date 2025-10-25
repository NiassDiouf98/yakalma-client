export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: DishCategory;
  ingredients: string[];
  supplements: string[];
  isAvailable: boolean;
  preparationTime: number; // in minutes
  rating: number;
  reviewsCount: number;
}

export enum DishCategory {
  ENTREE = 'Entrée',
  PLAT_PRINCIPAL = 'Plat Principal',
  DESSERT = 'Dessert',
  BOISSON = 'Boisson',
  ACCOMPAGNEMENT = 'Accompagnement'
}

export interface DishFilter {
  category?: DishCategory;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
  isAvailable?: boolean;
}
