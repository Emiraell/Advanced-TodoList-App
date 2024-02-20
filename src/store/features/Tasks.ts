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

const localData = localStorage.getItem("tasks");
const initialState: taskState = {
  tasks: localData ? (JSON.parse(localData) as task[]) : [],
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
      const taskToStore: task[] = state.tasks;
      localStorage.setItem("tasks", JSON.stringify(taskToStore));
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
    removeTask: (state, action: PayloadAction<task>) => {
      state.tasks = state.tasks.filter((task: task) => {
        task.id !== action.payload.id;
      });
    },
  },
});

export const { addTask, viewTaskDetail, removeTask } = TaskSlice.actions;
export default TaskSlice.reducer;
