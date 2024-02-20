import { configureStore } from "@reduxjs/toolkit";
import { userNameSlice } from "./features/userNameSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TaskSlice } from "./features/Tasks";
import { notificationSlice } from "./features/notificationSlice";

export const store = configureStore({
  reducer: {
    userNameReducer: userNameSlice.reducer,
    taskReducer: TaskSlice.reducer,
    notificationReducer: notificationSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
