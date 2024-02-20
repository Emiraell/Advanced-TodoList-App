import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type task = {
  id: number;
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
      id: 1,
      title: "WALK MY DOG",
      date: "19 Oct, 2024",
      description: "wal rosy out of the hpuse",
      clicked: false,
    },
    {
      id: 2,
      title: "WALK MY DOG2",
      date: "19 Oct, 2024",
      description: "wal rosy out of the hpuse",
      clicked: false,
    },
  ],
};

export const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<task>) => {
      state.tasks.push({
        id: state.tasks.length,
        title: action.payload.title,
        date: action.payload.date,
        description: action.payload.description,
        clicked: false,
      });
      console.log(state.tasks);
    },
    viewTaskDetail: (state, action: PayloadAction<task>) => {
      state.tasks.map((task: task) => {
        if (task.id === action.payload.id) {
          task.clicked = !task.clicked;
        } else {
          task.clicked = false;
        }
      });
    },
  },
});

export const { addTask, viewTaskDetail } = TaskSlice.actions;
export default TaskSlice.reducer;
