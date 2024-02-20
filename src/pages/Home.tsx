import { EffectCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../store/store";
import { viewTaskDetail, task, removeTask } from "../store/features/Tasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronCircleDown,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

// type displayState = { completed: boolean; favourite: boolean; trash: boolean };

export default function Home() {
  let fullDate: any = new Date();

  // const [displaying, setDisplaying] = useState<displayState>({
  //   completed: false,
  //   favourite: false,
  //   trash: false,
  // });

  const tasks: task[] = useAppSelector((state) => state.taskReducer.tasks);

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

  const dispatch = useAppDispatch();

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
        <div className="pt-12 px-10">
          <p className="text-xl border-b-2 w-fit pb-2 border-emerald-500">
            <span className=" bg-gray-300 text-gray-900 px-3 py-1 rounded-full mr-2">
              {tasks.length}
            </span>
            Tasks
          </p>
        </div>

        {/* todos */}
        <div className="mt-10 lg:grid grid-cols-2 gap-4">
          {tasks.map((task, index) => (
            <motion.div
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              key={index}
              className="bg-blue-400 w-full p-5 rounded-2xl tracking-wider my-7 even:bg-yellow-400 text-gray-800"
            >
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
                <p
                  className={`p-4 font-bold uppercase ${
                    task.clicked && "hidden"
                  }`}
                >
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
              <div className={`${!task.clicked && "hidden"}`}>
                <h2 className=" font-montserrat font-bold text-3xl break-all">
                  {task.title}
                </h2>
                <div className="my-10 flex items-center justify-between px-3">
                  <div>
                    <p className=" text-emerald-700 font-bold">Date Created</p>
                    <p className="text-sm px-1">oct 23, 2023</p>
                  </div>
                  <div>
                    <p className="text-emerald-700 font-bold">Task Date</p>
                    <p className="text-sm px-1">{task.date}</p>
                  </div>
                </div>
                <div className="text-lg">
                  {" "}
                  <h2 className="font-bold text-emerald-700">
                    Task Description
                  </h2>
                  <p className="">{task.description}</p>
                </div>

                <button className="w-full mt-10 bg-gray-900 text-gray-100 p-3 hover:opacity-80 duration-0.5 rounded-full">
                  <FontAwesomeIcon icon={faMarkdown} />{" "}
                  <p className="inline">Set as done</p>
                </button>
                <button
                  onClick={() => dispatch(removeTask(task))}
                  className="w-full mt-3 bg-red-800 text-gray-100 p-3 hover:opacity-80 duration-0.5 rounded-full"
                >
                  {" "}
                  <p className="inline px-2">Delete Task</p>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
