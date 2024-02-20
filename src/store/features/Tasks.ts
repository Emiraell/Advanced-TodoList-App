import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type task = {
  title: string;
  date: string;
  description: string;
  clicked: boolean;
};

interface taskState {
  tasks: task[];
}

const initialState: taskState = {
  tasks: [
    {
      title: "WALK MY DOG",
      date: "19 Oct, 2024",
      description: "wal rosy out of the hpuse",
      clicked: false,
    },
    {
      title: "WALK MY DOG2",
      date: "19 Oct, 2024",
      description: "wal rosy out of the hpuse",
      clicked: true,
    },
  ],
};

export const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<task>) => {
      state.tasks.push({
        title: action.payload.title,
        date: action.payload.date,
        description: action.payload.description,
        clicked: false,
      });
      console.log(state.tasks);
    },
    viewTaskDetail: (state, action: PayloadAction<boolean>) => {
      state.tasks.map((task: task) => {
        if (task.clicked === action.payload) {
          task.clicked = !task.clicked;
        }
      });
    },
  },
});

export const { addTask, viewTaskDetail } = TaskSlice.actions;
export default TaskSlice.reducer;
