import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addTask } from "../store/features/Tasks";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { task } from "../store/features/Tasks";

interface dataProps {
  title: string;
  date: string;
  description: string;
}
export default function AddEvent() {
  const schema = yup.object().shape({
    title: yup.string().required(),
    date: yup.string().required(),
    description: yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useAppDispatch();
  const taskId: number = useAppSelector(
    (state) => state.taskReducer.tasks.length
  );

  const navigate = useNavigate();

  const addTodo = (data: dataProps) => {
    const dataa: task = { ...data, id: taskId, clicked: false };
    dispatch(addTask(dataa));
    navigate("/home");
  };

  return (
    <div className="m-auto w-[85%] md:w-[60%] lg:w-[40%] ">
      <div className="py-12 text-2xl text-emerald-400  font-bold flex items-center">
        <Link to="/home">
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
          type="text"
          className="input"
          placeholder="Oct 1, 2024"
        />
        <p className="text-sm text-red-400 mb-5 px-2">{errors.date?.message}</p>

        {/* start time */}
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
