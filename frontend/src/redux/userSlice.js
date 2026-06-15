import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    // reducer to update credits - so basically here we are defining a reducer function called updateCredits that takes the current state and an action as parameters, and if the userData exists in the state, it updates the credits property of userData with the value provided in the action's payload, this allows us to easily update the user's credits in the Redux store whenever they generate notes or perform any action that affects their credits
    updateCredits: (state, action) => {
      if (state.userData) {
        state.userData.credits = action.payload;
      }
    },
  },
});

export const { setUserData, updateCredits } = userSlice.actions;

export default userSlice.reducer;
