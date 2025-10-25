# TODO: Implement Mobile Filter Toggle

## Tasks
- [x] Add showFilter property and toggleFilter method in home.ts
- [x] Add MatButtonModule import in home.ts
- [x] Add filter toggle button in home.html (visible only on mobile)
- [x] Modify aside element in home.html to conditionally show filter based on showFilter and screen size
- [ ] Test the implementation on mobile and desktop views

## Information Gathered
- Filter component is located in src/app/components/filter/
- Filter is used in home.html as <app-filter> inside an aside element
- Home component uses grid layout: grid-cols-1 lg:grid-cols-4
- On mobile (small screens), filter should be hidden by default
- On desktop (lg+), filter should always be visible
- Need to add a filter icon button that toggles filter visibility on mobile

## Plan
1. Update home.ts to add showFilter boolean property and toggleFilter method
2. Import MatButtonModule in home.ts for the toggle button
3. In home.html, add a filter button visible only on mobile (lg:hidden)
4. Modify the aside element to use dynamic class binding: [class]="showFilter ? 'block' : 'hidden lg:block'"
5. This ensures:
   - On mobile: hidden by default, shown when showFilter is true
   - On desktop: always visible regardless of showFilter

## Dependent Files
- src/app/pages/home/home.ts
- src/app/pages/home/home.html

## Followup Steps
- Test on different screen sizes
- Ensure filter functionality works when toggled
- Verify no layout issues on mobile/desktop
