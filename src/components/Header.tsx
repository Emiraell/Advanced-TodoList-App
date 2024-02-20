import { faBell, faPlus, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SideNav from "./SideNav";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { notification } from "../store/features/notificationSlice";

export default function Header() {
  const [menuClicked, setMenuClicked] = useState<boolean>(false);
  const notification: notification[] | undefined = useAppSelector(
    (state) => state.notificationReducer?.contents
  );

  return (
    <div>
      <div
        className={`py-10 px-5 flex items-start fixed left-0 right-0 justify-between z-10`}
      >
        <div
          className={` lg:px-14 ${
            menuClicked &&
            "bg-gray-950 h-[100vh] -top-10 -left-7 py-10 px-10 relative"
          }`}
        >
          <div onClick={() => setMenuClicked(!menuClicked)}>
            <FontAwesomeIcon
              icon={faUser}
              className={`h-8 ${
                menuClicked && "hidden"
              } md:hidden bg-emerald-900 p-3 rounded-full`}
            />{" "}
            <div
              className={`flex font-rochester items-center justify-between text-2xl  ${
                !menuClicked && "hidden"
              } md:block`}
            >
              <p>
                <span className="text-red-400 ">Emirael</span> Todo
              </p>
              <FontAwesomeIcon icon={faX} className={`h-5 md:hidden`} />
            </div>
          </div>
          <SideNav menuClicked={menuClicked} />
        </div>

        {/*  */}
        <div className="flex items-center ">
          <div className="flex justify-evenly w-20 relative  mx-5">
            <FontAwesomeIcon icon={faBell} className="h-8" />
            <p className="absolute bg-red-700 rounded-full py-1 px-2 -top-4 right-4">
              {notification.length}
            </p>
          </div>
          <Link to="/add_event">
            <FontAwesomeIcon
              icon={faPlus}
              className="h-6 bg-emerald-900 p-2 rounded-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
