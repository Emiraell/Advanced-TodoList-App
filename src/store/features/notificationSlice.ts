import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface messages {
  id: number;
  header: string;
  message: string;
}

export interface notificationState {
  notifications: messages[];
}

// getting notification messages from my local storage
const storedMessages = sessionStorage.getItem("messages");

// get the message if sessionStorage is not falsy
let notificationMessages;
try {
  notificationMessages =
    storedMessages && (JSON.parse(storedMessages) as messages[]);
} catch {
  notificationMessages = [];
}

// initial state of the notifications
const initialState: notificationState = {
  notifications: notificationMessages || [],
};
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    // add notifications/ messages to the state
    addNotification: (state, action: PayloadAction<messages>) => {
      state?.notifications.unshift({
        id: -1,
        header: action.payload.header,
        message: action.payload.message,
      });
      // increment the previous ids to set all ids to different values which
      // will also be the index of the message in the array
      state.notifications.map((content) => (content.id = content.id + 1));
      const notifications: messages[] = state.notifications;
      // store in local storage
      sessionStorage.setItem("messages", JSON.stringify(notifications));
    },

    // remove notifications
    removeNotification: (state, action: PayloadAction<messages>) => {
      state.notifications.map((content) => {
        if (content.id === action.payload.id) {
          state.notifications.splice(content.id, 1);
          state.notifications.map((contentId) => {
            // decrement the ids of the messages after the deleted messages
            if (contentId.id > content.id) {
              contentId.id = contentId.id - 1;
            }
          });
        }
      });
      // store/update in local storage
      sessionStorage.setItem("messages", JSON.stringify(state.notifications));
    },
    // reset the notifications
    resetNotifications: (state) => {
      sessionStorage.removeItem("messages");
      state.notifications = initialState.notifications;
    },
  },
});

//  export all actions
export const { addNotification, removeNotification, resetNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
