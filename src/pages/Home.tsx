import { EffectCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import { useAppSelector } from "../store/store";
import {
  // viewTaskDetail,
  task,
  // removeTask,
  // completeTask,
} from "../store/features/Tasks";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-regular-svg-icons";
// import {
//   faChevronCircleDown,
//   faTrash,
//   faX,
// } from "@fortawesome/free-solid-svg-icons";
// import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
// import { motion } from "framer-motion";
// import {
//   addNotification,
//   notification,
// } from "../store/features/notificationSlice";
import TaskList from "../components/TaskList";

type displayState = { tasks: boolean; complete: boolean };

export default function Home() {
  let fullDate: any = new Date();

  const [displaying, setDisplaying] = useState<displayState>({
    tasks: true,
    complete: false,
  });

  let tasks: task[] = useAppSelector((state) => state.taskReducer.tasks);
  let completedTasks: task[] = useAppSelector(
    (state) => state.taskReducer.completed
  );

  const [greeting, setGreeting] = useState<string>();
  const [day, setDay] = useState<string>();
  const date: number = fullDate.getDate();
  const [month, setMonth] = useState<string>();
  const year: number = fullDate.getFullYear();

  useEffect((): ReturnType<EffectCallback> => {
    const hour: number = fullDate.getHours();
    hour >= 0 && hour < 12 && setGreeting("Good Morning");
    hour > 11 && hour < 16 && setGreeting("Good Afternoon");
    hour >= 16 && setGreeting("Good Evening");

    const day: number = fullDate.getDay();
    day === 0 && setDay("Sunday");
    day === 1 && setDay("Monday");
    day === 2 && setDay("Tuesday");
    day === 3 && setDay("Wednesday");
    day === 4 && setDay("Thursday");
    day === 6 && setDay("Friday");
    day === 7 && setDay("Saturday");

    const month: number = fullDate.getMonth();
    month === 0 && setMonth("Jan");
    month === 1 && setMonth("Feb");
    month === 2 && setMonth("Mar");
    month === 3 && setMonth("Apr");
    month === 4 && setMonth("May");
    month === 5 && setMonth("Jun");
    month === 6 && setMonth("Jul");
    month === 7 && setMonth("Aug");
    month === 8 && setMonth("Sep");
    month === 9 && setMonth("Oct");
    month === 10 && setMonth("Nov");
    month === 11 && setMonth("Dec");

    return (): void => {};
  }, []);

  const userName: string = useAppSelector(
    (state) => state.userNameReducer.userName
  );

  // const notifications: notification[] = useAppSelector(
  //   (state) => state.notificationReducer.contents
  // );
  // const dispatch = useAppDispatch();

  return (
    <div className="md:grid grid-cols-4">
      <div className=" col-span-1">
        <Header />
      </div>
      <div className="m-auto w-[90%] md:w-full text-start lg:pt-[17vh] pt-[12vh] col-span-3 md:border-l h-[100vh] md:px-20">
        <div className="px-10">
          <p className="text-2xl md:text-3xl tracking-wider text-emerald-400 py-3 ">
            {greeting}{" "}
            <span className=" text-gray-100">
              {userName !== "user" && userName}
            </span>
          </p>
          <p className=" font-rochester text-lg md:text-xl">Today's {day}</p>
          <p className=" text-gray-400 text-xs">
            {month} {date}, {year}
          </p>
        </div>
        <div className="pt-12 px-10 flex items-center text-xl">
          <p
            onClick={() => setDisplaying({ tasks: true, complete: false })}
            className={`${
              displaying.tasks && "border-b-2"
            }  w-fit pb-2 border-emerald-500`}
          >
            <span className=" bg-gray-300 text-gray-900 px-3 py-1 rounded-full mr-2">
              {tasks.length}
            </span>
            Tasks
          </p>
          <p
            onClick={() => setDisplaying({ tasks: false, complete: true })}
            className={` ${
              displaying.complete && "border-b-2"
            } w-fit pb-2 border-emerald-500 mx-10`}
          >
            <span className=" bg-gray-300 text-gray-900 px-3 py-1 rounded-full m-2">
              {completedTasks.length}
            </span>
            completed
          </p>
        </div>
        {/* todos */}
        <div className="mt-10 lg:grid grid-cols-2 gap-4">
          {displaying.tasks
            ? tasks.map((task, index) => (
                <TaskList key={index} task={task} userName={userName} />
              ))
            : completedTasks.map((task, index) => (
                <div key={index}>
                  <h2>{task.title}</h2>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
