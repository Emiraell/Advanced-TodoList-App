import time from "./assests/clockCalender.png";
import work from "./assests/coverImage.png";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export function Welcome() {
  return (
    <div className="  m-auto text-center w-[80%] md:w-[60%] lg:w-[40%] pt-10">
      <div className=" font-rochester text-4xl text-gray-300">
        <span className=" text-red-700">emirael</span> todo
      </div>

      <motion.div
        className=" py-10 "
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 4 }}
      >
        <div className="mr-20 ">
          <img
            src={time}
            alt="clock"
            className=" w-full object-cover rounded-full h-[30vh]
             border-8 border-blue-800"
          />
        </div>
        <div className="-mt-20 ml-20 z-10 relative">
          <img
            src={work}
            alt="work"
            className="w-full object-cover rounded-full h-[30vh] 
            border-8 border-orange-800"
          />
        </div>
      </motion.div>
      <motion.p
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className=" font-bold font-lato tracking-widest text-2xl px-10"
      >
        Effectively Manage your time
      </motion.p>
      <motion.div
        initial={{ x: 150, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="pt-10 flex items-center"
      >
        <span className="text-lg px-5">Get started</span>{" "}
        <Link to="/home">
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-3xl text-gray-900 bg-gray-200 rounded-full py-2 px-3"
          />{" "}
        </Link>
      </motion.div>
    </div>
  );
}
