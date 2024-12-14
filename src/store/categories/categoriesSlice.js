import { createSlice } from "@reduxjs/toolkit";

// Initial state
const CATEGORIES_INITIAL_STATE = {
  categories: [],
};

// Redux Toolkit createSlice
const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

// Export actions and reducer
export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
