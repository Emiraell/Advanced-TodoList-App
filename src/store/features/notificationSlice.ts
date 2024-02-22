import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface notification {
  id: number;
  header: string;
  message: string;
}

export interface notificationState {
  contents: notification[];
}

const messages = localStorage.getItem("messages");

let notificationMessage;
try {
  notificationMessage = messages && (JSON.parse(messages) as notification[]);
} catch (err) {
  console.log(err);
}

const initialState: notificationState = {
  contents: notificationMessage || [],
};
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<notification>) => {
      state?.contents.unshift({
        id: state.contents.length - 1,
        header: action.payload.header,
        message: action.payload.message,
      });
      const notifications: notification[] = state.contents;
      localStorage.setItem("messages", JSON.stringify(notifications));
    },
    removeNotification: (state, action: PayloadAction<notification>) => {
      state.contents.map((content) => {
        if (content.message === action.payload.message) {
          state.contents.splice(content.id, 1);
          state.contents.map((contentId) => {
            contentId.id = content.id - 1;
          });
        }
      });
      const notifications: notification[] = state.contents;
      localStorage.setItem("messages", JSON.stringify(notifications));
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
