import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface userState {
  userName: string;
}

const name = localStorage.getItem("username") || "user";
const initialState: userState = { userName: name };
export const userNameSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    changeUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      let name = state.userName;
      localStorage.setItem("username", name);
    },
  },
});
export const { changeUserName } = userNameSlice.actions;
export default userNameSlice.reducer;
