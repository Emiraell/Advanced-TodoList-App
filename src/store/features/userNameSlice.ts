import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface userState {
  userName: string;
}

const name: string = localStorage.getItem("username") || "user";
const initialState: userState = { userName: name };
export const userNameSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    changeUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      let name: string = state.userName;
      localStorage.setItem("username", name);
    },
    resetUserName: (state) => {
      localStorage.removeItem("username");
      state.userName = initialState.userName;
    },
  },
});
export const { changeUserName, resetUserName } = userNameSlice.actions;
export default userNameSlice.reducer;
