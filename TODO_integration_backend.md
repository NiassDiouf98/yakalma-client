# TODO: Integrate Frontend with Backend MenuItem

## Tasks
- [x] Update yakalma-client/src/app/core/models/dish.ts to match backend MenuItem schema
- [x] Update yakalma-client/src/app/core/services/dish.ts mapping function
- [x] Update yakalma-client/src/app/components/menu-list/menu-list.ts to handle missing fields
- [x] Update yakalma-client/src/app/components/dish-detail/dish-detail.html to display only available data

## Details
- Removed frontend-only fields: category, ingredients, isAvailable, preparationTime, rating, reviewsCount
- Kept fields matching backend: name, description, price, image, supplements, quantity
- Updated components to conditionally display or remove sections for missing data
