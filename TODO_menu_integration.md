# TODO: Integrate Restaurant Menus

## Tasks
- [ ] Update Dish interface to match backend MenuItem structure
- [ ] Fix type mismatches (id to string, supplements structure)
- [ ] Update dish service mapping logic
- [ ] Update mock data ids to strings
- [ ] Update menu-list trackBy function
- [ ] Test menu loading from backend

## Information Gathered
- Backend MenuItem: _id (string), name, description, price, image, restaurantId, supplements [{name, price}], quantity
- Frontend Dish: id (string) -> changed from number, supplements {name, price}[] -> changed from string[], added quantity
- Mapping issues: id vs _id, supplements structure, isAvailable based on quantity

## Plan
1. Edit dish.ts model: change id to string, update supplements interface, add quantity
2. Edit dish.ts service: update mapMenuItemsToDishes, fix mock data ids
3. Edit menu-list.ts: update trackByDishId to return string
4. Test integration
