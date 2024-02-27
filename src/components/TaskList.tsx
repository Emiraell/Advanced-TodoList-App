import {
  faUser,
  faChevronCircleDown,
  faX,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  viewTaskDetail,
  removeTask,
  completeTask,
  task,
} from "../store/features/Tasks";
import { addNotification, messages } from "../store/features/notificationSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

interface propss {
  task: task;
  userName: string;
}

export default function TaskList({ task, userName }: propss) {
  // read the state from redux store
  const dispatch = useAppDispatch();
  const notifications: messages[] = useAppSelector(
    (state) => state.notificationReducer.notifications
  );

  // remove task either from completed or from all task
  const removetodo = (name: task) => {
    dispatch(removeTask(name));
    dispatch(
      addNotification({
        id: notifications.length,
        header: !name.completed
          ? "You deleted a task from your tasks"
          : "You deleted a task from your completed task ",
        message: task.title,
      })
    );
  };

  // jsx for displaying either completed task or all task
  return (
    <div className="bg-blue-400 w-full p-5 rounded-2xl tracking-wider my-7 shadow-md even:bg-yellow-400 text-gray-800">
      <div
        className={`flex justify-between items-center text-lg ${
          task.clicked && "hidden"
        }`}
      >
        <p>
          <FontAwesomeIcon icon={faUser} className="h-6" />{" "}
          <span>{userName}</span>
        </p>
        <span>{task.date}</span>
      </div>
      <div
        className={`${
          !task.clicked && "flex"
        } items-center justify-between text-xl`}
      >
        <p className={`p-4 font-bold uppercase ${task.clicked && "hidden"}`}>
          {task.title}
        </p>
        <div
          className={`${task.clicked && "text-xl text-end p-2"} h-fit`}
          onClick={() => {
            dispatch(viewTaskDetail(task));
          }}
        >
          {!task.clicked ? (
            <FontAwesomeIcon icon={faChevronCircleDown} />
          ) : (
            <FontAwesomeIcon icon={faX} />
          )}
        </div>
      </div>
      {/* buttons */}
      <div className={`${task.clicked && "hidden"} mt-5 flex items-center `}>
        <button
          // completed task
          onClick={() => {
            dispatch(completeTask(task));
            dispatch(
              addNotification({
                id: notifications.length,
                header: "You completed a task",
                message: `${task.title}`,
              })
            );
          }}
          className={`w-full bg-gray-900 text-gray-100 p-3 hover:opacity-80 
				duration-0.5 rounded-full ${task.completed && "hidden"}`}
        >
          <p className="inline">Set as done</p>
        </button>
        <button
          onClick={() => {
            removetodo(task);
          }}
          className={`w-full bg-transparent border-red-800 border-2 text-red-800 p-2 
				hover:bg-red-800 hover:text-gray-100 duration-0.5 rounded-full ml-5`}
        >
          <p className="inline px-2">Delete Task</p>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      {/* view task */}
      <div className={`${!task.clicked && "hidden"}`}>
        <h2 className=" font-montserrat font-bold text-3xl break-all">
          {task.title}
        </h2>
        <div className="my-10 flex items-center justify-between px-3">
          <div>
            <p className=" text-emerald-700 font-bold">Date Created</p>
            <p className="text-sm px-1">{task.dateCreated}</p>
          </div>
          <div>
            <p className="text-emerald-700 font-bold">Task Date</p>
            <p className="text-sm px-1">{task.date}</p>
          </div>
        </div>
        <div className="text-lg">
          {" "}
          <h2 className="font-bold text-emerald-700 lowercase">
            Task Description
          </h2>
          <p className="">{task.description}</p>
        </div>
      </div>
    </div>
  );
}
