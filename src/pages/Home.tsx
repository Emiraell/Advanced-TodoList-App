import { EffectCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import { useAppSelector } from "../store/store";
import { task } from "../store/features/Tasks";
import TaskList from "../components/TaskList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

type displayState = { tasks: boolean; complete: boolean };

export default function Home() {
  // get current date
  let fullDate: Date = new Date();

  // state for the task displaying
  const [displaying, setDisplaying] = useState<displayState>({
    tasks: true,
    complete: false,
  });

  // reading the states in the redux store
  const tasks: task[] = useAppSelector((state) => state.taskReducer.tasks);
  const completedTasks: task[] = useAppSelector(
    (state) => state.taskReducer.completed
  );
  const userName: string = useAppSelector(
    (state) => state.userNameReducer.userName
  );

  // get the current time, day, month and year,
  const [greeting, setGreeting] = useState<string>();
  const [day, setDay] = useState<string>();
  const date: number = fullDate.getDate();
  const [month, setMonth] = useState<string>();
  const year: number = fullDate.getFullYear();

  // set time on page load
  useEffect((): ReturnType<EffectCallback> => {
    // time
    const hour: number = fullDate.getHours();
    hour >= 0 && hour < 12 && setGreeting("Good Morning");
    hour > 11 && hour < 16 && setGreeting("Good Afternoon");
    hour >= 16 && setGreeting("Good Evening");

    // day
    const day: number = fullDate.getDay();
    day === 0 && setDay("Sunday");
    day === 1 && setDay("Monday");
    day === 2 && setDay("Tuesday");
    day === 3 && setDay("Wednesday");
    day === 4 && setDay("Thursday");
    day === 6 && setDay("Friday");
    day === 7 && setDay("Saturday");

    // month
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

  return (
    <div>
      <div className="md:grid grid-cols-4">
        <div className=" col-span-1">
          {/* header component */}
          <Header />
        </div>
        {/* home contents */}
        <div className="m-auto w-[90%] md:w-full text-start md:pt-[10vh] pt-[17vh] col-span-3 md:border-l h-[100vh] md:px-20">
          <div className="px-10">
            <p className="text-2xl md:text-3xl tracking-wider text-emerald-400 py-3 ">
              {greeting} {/* display username if not user */}
              <span className=" text-gray-100">
                {userName !== "user" && userName}
              </span>
            </p>
            {/* display day and date */}
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
              {/* all task */}
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
              {/* completed task */}
              <span className=" bg-gray-300 text-gray-900 px-3 py-1 rounded-full m-2">
                {completedTasks.length}
              </span>
              completed
            </p>
          </div>
          {/* display tasked based on the if task property is true */}
          <div className="mt-10 lg:grid grid-cols-2 gap-4">
            {/* display tasks */}
            {displaying.tasks
              ? tasks.map((task, index) => (
                  <TaskList key={index} task={task} userName={userName} />
                ))
              : // display completed tasks
                completedTasks.map((task, index) => (
                  <TaskList key={index} task={task} userName={userName} />
                ))}
          </div>
        </div>
      </div>
      <div className="text-center fixed bottom-10 left-0 right-0 z-10">
        <Link to="/advanced_todolist_app/add_event">
          <FontAwesomeIcon
            icon={faPlus}
            className=" bg-emerald-500 p-3 rounded-full text-4xl hover:opacity-75 duration-0.5 ease-in-out"
          />
        </Link>
      </div>
    </div>
  );
}
