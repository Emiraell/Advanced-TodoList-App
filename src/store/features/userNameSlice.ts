import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// username interface
interface userState {
  userName: string;
}

// get username from local storage
const name: string = localStorage.getItem("username") || "user";

// initial value/state of the name
const initialState: userState = { userName: name };
export const userNameSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    // change the userName
    changeUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      // store in local storage
      let name: string = state.userName;
      localStorage.setItem("username", name);
    },
    // reset the userName
    resetUserName: (state) => {
      localStorage.removeItem("username");
      state.userName = initialState.userName;
    },
  },
});
// export all actions
export const { changeUserName, resetUserName } = userNameSlice.actions;
export default userNameSlice.reducer;
