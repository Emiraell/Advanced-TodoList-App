import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface userState {
  userName: string;
}

const initialState: userState = { userName: "user" };
export const userNameSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    changeUserName: (state, action: PayloadAction<any>) => {
      state.userName = action.payload;
    },
  },
});
export const { changeUserName } = userNameSlice.actions;
export default userNameSlice.reducer;
