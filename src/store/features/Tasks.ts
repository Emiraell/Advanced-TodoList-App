import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type task = {
  id: number;
  title: string;
  date: string;
  dateCreated: string;
  description: string;
  clicked: boolean;
  completed: boolean;
};

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
        dateCreated: string;
        description: string;
      }>
    ) => {
      state.tasks.unshift({
        id: -1,
        title: action.payload.title,
        date: action.payload.date,
        dateCreated: action.payload.dateCreated,
        description: action.payload.description,
        clicked: false,
        completed: false,
      });
      state.tasks.map((task) => (task.id = task.id + 1));
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
      if (!action.payload.completed) {
        state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            state.tasks.splice(task.id, 1);
            state.tasks.map((taskId) => {
              if (taskId.id > task.id) {
                taskId.id = taskId.id - 1;
              }
            });
          }
        });
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      } else {
        state.completed.map((task) => {
          if (task.id === action.payload.id) {
            state.completed.splice(task.id, 1);
            state.completed.map((taskId) => {
              if (taskId.id > task.id) {
                taskId.id = taskId.id - 1;
              }
            });
          }
        });
        localStorage.setItem("completed", JSON.stringify(state.completed));
      }
    },

    completeTask: (state, action: PayloadAction<task>) => {
      state.tasks.map((comTask) => {
        if (comTask.id === action.payload.id) {
          state.tasks.splice(comTask.id, 1);
          comTask.id = -1;
          state.completed.unshift(comTask);
          state.completed.map((task) => {
            task.id = task.id + 1;
            task.completed = true;
          });

          state.tasks.map((taskId) => {
            if (taskId.id > comTask.id) {
              taskId.id = taskId.id - 1;
            }
          });
        }
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
        localStorage.setItem("completed", JSON.stringify(state.completed));
      });
    },
    reset: (state) => {
      localStorage.removeItem("tasks");
      localStorage.removeItem("completed");
      state.completed = initialState.completed;
      state.tasks = initialState.tasks;
    },
  },
});

export const { addTask, viewTaskDetail, removeTask, completeTask, reset } =
  TaskSlice.actions;
export default TaskSlice.reducer;
