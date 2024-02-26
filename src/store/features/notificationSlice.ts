import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface notification {
  id: number;
  header: string;
  message: string;
}

export interface notificationState {
  contents: notification[];
}

// getting notification messages from my local storage
const messages = localStorage.getItem("messages");

let notificationMessages;
try {
  notificationMessages = messages && (JSON.parse(messages) as notification[]);
} catch {
  notificationMessages = [];
}

const initialState: notificationState = {
  contents: notificationMessages || [],
};
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<notification>) => {
      state?.contents.unshift({
        id: -1,
        header: action.payload.header,
        message: action.payload.message,
      });
      state.contents.map((content) => (content.id = content.id + 1));
      const notifications: notification[] = state.contents;
      localStorage.setItem("messages", JSON.stringify(notifications));
    },
    removeNotification: (state, action: PayloadAction<notification>) => {
      state.contents.map((content) => {
        if (content.id === action.payload.id) {
          state.contents.splice(content.id, 1);
          state.contents.map((contentId) => {
            if (contentId.id > content.id) {
              contentId.id = contentId.id - 1;
            }
          });
        }
      });
      localStorage.setItem("messages", JSON.stringify(state.contents));
    },
    resetNotifications: (state) => {
      localStorage.removeItem("messages");
      state.contents = initialState.contents;
    },
  },
});

export const { addNotification, removeNotification, resetNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
