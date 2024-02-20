import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface notification {
  header: string;
  message: string;
}

interface notificationState {
  contents: notification[];
}

const messages = localStorage.getItem("messages");
let initialState: notificationState = {
  contents: messages ? (JSON.parse(messages) as notification[]) : [],
};
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<notification>) => {
      state?.contents.push({
        header: action.payload.header,
        message: action.payload.message,
      });
      const notifications: notification[] = state.contents;
      localStorage.setItem("messages", JSON.stringify(notifications));
    },
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
