import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type task = {
  title: string;
  date: string;
  description: string;
};

interface taskState {
  tasks: task[];
}

const initialState: taskState = { tasks: [] };

export const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<task>) => {
      state.tasks.push({
        title: action.payload.title,
        date: action.payload.date,
        description: action.payload.description,
      });
      console.log(state.tasks);
    },
  },
});

export const { addTask } = TaskSlice.actions;
export default TaskSlice.reducer;
