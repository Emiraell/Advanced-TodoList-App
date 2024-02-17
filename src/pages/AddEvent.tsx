import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../store/store";
import { addTask } from "../store/features/Tasks";

interface TaskState {
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

  const addTas = (data: TaskState) => {
    dispatch(addTask(data));
    //console.log(data, "submitted");
  };

  return (
    <div className="m-auto w-[85%] md:w-[60%] lg:w-[40%] ">
      <p className="text-center text-2xl text-emerald-400 py-12 font-bold font-montserrat">
        New Task
      </p>

      <form
        onSubmit={handleSubmit(addTas)}
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
