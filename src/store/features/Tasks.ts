import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// type of my task state
export type task = {
  id: number;
  title: string;
  date: string;
  dateCreated: string;
  description: string;
  clicked: boolean;
  completed: boolean;
};
// get task from local storage
const allTasks = localStorage.getItem("tasks");
// get completed task from local storage
const completedTask = localStorage.getItem("completed");

// check if tasks are available in local storage
let tasksTodo;
let completedTodo;
try {
  tasksTodo = allTasks && (JSON.parse(allTasks) as task[]);
  completedTodo = completedTask && (JSON.parse(completedTask) as task[]);
} catch (err) {
  tasksTodo = [];
  completedTodo = [];
}

// inital states
const initialState = {
  tasks: (tasksTodo as task[]) || [],
  completed: (completedTodo as task[]) || [],
};

export const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // add task to tasks state
    addTask: (
      state,
      action: PayloadAction<{
        title: string;
        date: string;
        dateCreated: string;
        description: string;
      }>
    ) => {
      // add to the start of the tasks state array/list
      state.tasks.unshift({
        id: -1,
        title: action.payload.title,
        date: action.payload.date,
        dateCreated: action.payload.dateCreated,
        description: action.payload.description,
        clicked: false,
        completed: false,
      });
      // increment the ids anytime an task is added to match the index of the task in the array
      state.tasks.map((task) => (task.id = task.id + 1));
      // store/update in local storage
      const taskToStore: task[] = state.tasks;
      localStorage.setItem("tasks", JSON.stringify(taskToStore));
    },

    // access the details of the task by changing the clicked property
    viewTaskDetail: (state, action: PayloadAction<task>) => {
      state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          task.clicked = !task.clicked;
        } else {
          task.clicked = false;
        }
      });
    },

    // remove task from either the task or completed task
    removeTask: (state, action: PayloadAction<task>) => {
      // remove from the tasks state if the task isnt completed
      if (!action.payload.completed) {
        state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            state.tasks.splice(task.id, 1);
            state.tasks.map((taskId) => {
              // decrement the task ids of the tasks thats after the deleted tasks
              if (taskId.id > task.id) {
                taskId.id = taskId.id - 1;
              }
            });
          }
        });
        // update/ store in local storage
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      } else {
        // remove if item is located is set as completed
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
        // store/update local storage
        localStorage.setItem("completed", JSON.stringify(state.completed));
      }
    },

    // set task to completed
    completeTask: (state, action: PayloadAction<task>) => {
      state.tasks.map((completedTask) => {
        if (completedTask.id === action.payload.id) {
          // remove item from the tasks state and push to the completed state when item is completed
          state.tasks.splice(completedTask.id, 1);
          completedTask.id = -1;
          state.completed.unshift(completedTask);
          state.completed.map((task) => {
            // set all task in completed state to true
            task.id = task.id + 1;
            task.completed = true;
          });

          state.tasks.map((taskId) => {
            if (taskId.id > completedTask.id) {
              taskId.id = taskId.id - 1;
            }
          });
        }
        // update in local storage
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
        localStorage.setItem("completed", JSON.stringify(state.completed));
      });
    },

    // reset all tasks states
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
