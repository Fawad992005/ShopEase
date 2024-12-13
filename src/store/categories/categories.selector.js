import { createSelector } from "reselect";

// Input selector: extracts the raw categories array from the state
const selectCategoriesReducer = (state) => state.categories.categories;

// Memoized selector: creates and returns the categories map
export const selectCategoriesMap = createSelector(
  [selectCategoriesReducer], // Input selector(s)
  (
    categories //Output Selectors
  ) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
