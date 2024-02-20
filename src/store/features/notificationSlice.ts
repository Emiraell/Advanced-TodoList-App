import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface notification {
  header: string;
  message: string;
}

interface notificationState {
  contents: notification[];
}

let initialState: notificationState = { contents: [] };
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<notification>) => {
      state?.contents.push({
        header: action.payload.header,
        message: action.payload.message,
      });
    },
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
