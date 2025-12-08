export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  supplements: { name: string; price: number }[];
  quantity: number;
}

export enum DishCategory {
  ENTREE = 'Entrée',
  PLAT_PRINCIPAL = 'Plat Principal',
  DESSERT = 'Dessert',
  BOISSON = 'Boisson',
  ACCOMPAGNEMENT = 'Accompagnement'
}

export interface DishFilter {
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
}
