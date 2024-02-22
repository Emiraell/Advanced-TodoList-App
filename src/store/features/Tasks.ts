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
const completedTask = localStorage.getItem("completed");
let result;
let completedTodo;
try {
  result = localData && (JSON.parse(localData) as task[]);
  completedTodo = completedTask && (JSON.parse(completedTask) as task[]);
} catch (err) {
  console.log(err);
}
const initialState = {
  tasks: (result as task[]) || [],
  completed: (completedTodo as task[]) || [],
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
      state.tasks.unshift({
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
    removeTask: (state, action: PayloadAction<task>) => {
      state.tasks.map((taskk) => {
        if (taskk.id === action.payload.id) {
          state.tasks.splice(taskk.id, 1);
          state.tasks.map((taskId) => {
            taskId.id = taskId.id - 1;
          });
        }
      });

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    completeTask: (state, action: PayloadAction<task>) => {
      state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          const completed = action.payload;
          state.completed.unshift(completed);
          localStorage.setItem("completed", JSON.stringify(state.completed));
          // removeTask(task);
        }
      });
    },
  },
});

export const { addTask, viewTaskDetail, removeTask, completeTask } =
  TaskSlice.actions;
export default TaskSlice.reducer;
