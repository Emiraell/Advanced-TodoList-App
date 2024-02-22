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
let result;
try {
  result = localData && (JSON.parse(localData) as task[]);
} catch (err) {
  console.log(err);
}
const initialState: taskState = {
  tasks: result || [],
};

export const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        title: string;
        date: string;
        description: string;
      }>
    ) => {
      state.tasks.push({
        id: state.tasks.length - 1,
        title: action.payload.title,
        date: action.payload.date,
        description: action.payload.description,
        clicked: false,
      });
      const taskToStore: task[] = state.tasks;
      localStorage.setItem("tasks", JSON.stringify(taskToStore));
    },
    viewTaskDetail: (state, action: PayloadAction<task>) => {
      state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          task.clicked = !task.clicked;
        } else {
          task.clicked = false;
        }
      });
    },
    removeTask: (state, action) => {
      state.tasks.map((taskk) => {
        if (taskk.id === action.payload.id) {
          state.tasks.splice(taskk.id, 1);
          state.tasks.map((taskId) => {
            taskId.id = taskId.id - 1;
          });
        }
      });
      console.log(action.payload);

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, viewTaskDetail, removeTask } = TaskSlice.actions;
export default TaskSlice.reducer;
