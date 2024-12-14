import { createSlice } from "@reduxjs/toolkit";

// Initial state
const INITIAL_STATE = {
  currentUser: null,
};

// Redux Toolkit createSlice
const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      const user = action.payload;

      // If the user is not null, extract serializable properties
      if (user) {
        const { uid, email, displayName } = user; // Only serializable data
        state.currentUser = { uid, email, displayName };
      } else {
        // If user is null, set currentUser to null
        state.currentUser = null;
      }
    },
  },
});

// Export actions and reducer
export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
