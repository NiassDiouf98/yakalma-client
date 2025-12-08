# TODO: Replace Static Data with Backend Data in dish.ts

## Tasks
- [ ] Remove the private dishes array
- [ ] Update apiUrl to use environment.apiUrl
- [ ] Modify getAllDishes to always fetch from backend (require restaurantId)
- [ ] Modify getDishById to fetch from backend
- [ ] Update getDishesByCategory to fetch from backend
- [ ] Update applyFilters to work with backend data
- [ ] Update getNextBatch to work with backend data
- [ ] Remove filteredDishesSubject and related BehaviorSubject logic
- [ ] Test the changes to ensure data is fetched correctly from backend
- [ ] Update components that use these methods if they don't pass restaurantId
