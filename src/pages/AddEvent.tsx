import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addTask } from "../store/features/Tasks";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { task } from "../store/features/Tasks";
import { addNotification } from "../store/features/notificationSlice";

// interface for data to push
interface dataProps {
  title: string;
  date: string;
  description: string;
}
export default function AddEvent() {
  // shape of the task data
  const schema = yup.object().shape({
    title: yup.string().required(),
    date: yup.string().required(),
    description: yup.string().required(),
  });

  // handling the inputs with useform
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // reading the state of the reducers in the store
  const dispatch = useAppDispatch();
  const taskId: number = useAppSelector(
    (state) => state.taskReducer.tasks.length
  );
  const notificationId = useAppSelector(
    (state) => state.notificationReducer.notifications.length
  );

  // naviagtion
  const navigate = useNavigate();

  // add task functionality
  const addTodo = (data: dataProps) => {
    // get date of adding event
    const currentDate = new Date();
    const dateCreated = ` ${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;

    // data structure of task to add
    const tasks: task = {
      ...data,
      dateCreated,
      id: taskId,
      clicked: false,
      completed: false,
    };
    // add task using the actions in our stored reducers
    dispatch(addTask(tasks));
    // add notification
    dispatch(
      addNotification({
        id: notificationId - 1,
        header: `Added a task to your events`,
        message: data.title,
      })
    );
    // navigate to home after adding
    navigate("/advanced_todolist_app/home");
  };

  return (
    <div className="m-auto w-[85%] md:w-[60%] lg:w-[40%] ">
      <div className="py-12 text-2xl text-emerald-400 font-bold flex items-center">
        <Link to="/advanced_todolist_app/home">
          <FontAwesomeIcon icon={faArrowLeft} className="pl-4" />
        </Link>
        <p className="font-montserrat px-20 md:px-32 lg:px-36">New Task</p>
      </div>

      <form
        onSubmit={handleSubmit(addTodo)}
        className="shadow-lg bg-gray-950 text-lg tracking-wider font-poppins p-5 rounded-lg"
      >
        {/* tittle */}
        <label htmlFor="title" className="p-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          {...register("title")}
          id="title"
          type="text"
          className="input"
          placeholder="Design website"
        />
        <p className="text-sm text-red-400 mb-5 px-2">
          {errors.title?.message}
        </p>

        {/* date */}
        <label htmlFor="date" className="p-2">
          Date <span className="text-red-500">*</span>
        </label>
        <input
          {...register("date")}
          id="date"
          type="date"
          className="input"
          placeholder="Oct 1, 2024"
        />
        <p className="text-sm text-red-400 mb-5 px-2">{errors.date?.message}</p>

        {/* task description*/}
        <label htmlFor="description" className="p-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("description")}
          className="input h-32"
          id="description"
          placeholder="Build a responsive website for my church"
        ></textarea>
        <p className="text-sm text-red-400 mb-5 px-2">
          {errors.description?.message}
        </p>

        {/* submit button */}
        <button
          type="submit"
          className="w-full p-3 outline-none rounded-md bg-green-700 
				hover:opacity-60 duration-0.5 transition-opacity"
        >
          Add task
        </button>
      </form>
    </div>
  );
}
