# TODO: Rendre dynamique l'affichage du nom du restaurant

## Tâches complétées
- [x] Créer un service RestaurantService pour récupérer les données du restaurant depuis le backend
- [x] Mettre à jour le composant Home pour utiliser le service et afficher le nom du restaurant
- [x] Modifier le template HTML pour lier dynamiquement le nom du restaurant
- [x] Configurer HttpClient dans app.config.ts pour permettre les requêtes HTTP
- [x] Ajouter une méthode getRestaurantById dans RestaurantService pour récupérer le restaurant par ID
- [x] Modifier les routes pour inclure l'ID du restaurant dans l'URL (/restaurant/:restaurantId)
- [x] Mettre à jour le composant Home pour récupérer l'ID du restaurant depuis les paramètres de route
- [x] Mettre à jour le service DishService pour récupérer les plats depuis le backend en utilisant l'ID du restaurant
- [x] Mettre à jour le composant MenuList pour accepter l'ID du restaurant en entrée
- [x] Mettre à jour le template Home pour passer l'ID du restaurant au composant MenuList

## Étapes suivantes
- [ ] Tester l'application pour s'assurer que le nom du restaurant s'affiche correctement avec l'ID dans l'URL
- [ ] Gérer les erreurs de chargement (par exemple, si le backend n'est pas disponible)
- [ ] Ajouter un état de chargement pendant la récupération des données
- [ ] Adapter le modèle Dish pour correspondre aux données du backend MenuItem
- [ ] Gérer la navigation vers les détails du plat avec l'ID du restaurant dans l'URL
