import { faBell, faPlus, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SideNav from "./SideNav";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { messages } from "../store/features/notificationSlice";

export default function Header() {
  const [menuClicked, setMenuClicked] = useState<boolean>(false);
  // reading notification state from the redux store
  const notification: messages[] = useAppSelector(
    (state) => state.notificationReducer?.notifications
  );

  // state to check when we scroll down the app
  const [scrolledY, setScrolledY] = useState<boolean>(false);

  // change the status of scrolledY
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      setScrolledY(true);
    } else {
      setScrolledY(false);
    }
  });
  return (
    <div className={``}>
      <div
        className={`${
          menuClicked && "bg-gray-900 w-[70vw] h-[100vh]"
        } fixed md:relative right-0 left-0`}
      >
        <div
          className={`flex justify-between w-[100%] pt-10 px-6 text-2xl ${
            scrolledY && "bg-gray-900 md:bg-gray-950"
          }`}
        >
          <div>
            <div className=" ml-5 flex justify-between">
              <p
                className={` ${
                  !menuClicked && "hidden"
                } font-rochester md:block`}
              >
                <span className="text-red-400  ">Emirael</span> Todo
              </p>
              <div onClick={() => setMenuClicked(!menuClicked)}>
                <FontAwesomeIcon
                  icon={faUser}
                  className={`md:hidden ${
                    menuClicked && "hidden"
                  } bg-emerald-600 p-3 rounded-full`}
                />
                <FontAwesomeIcon
                  icon={faX}
                  className={`${!menuClicked && "hidden"}`}
                />
              </div>
            </div>
            {/* side bar when menuclicked is true or for medium screens upwards */}
            <SideNav
              menuClicked={menuClicked}
              notification={notification?.length}
            />
          </div>
          <div
            className={`flex justify-between md:hidden ${
              menuClicked && "hidden"
            }`}
          >
            <div className="relative mr-10">
              <Link to="/notifications">
                <FontAwesomeIcon icon={faBell} />
                <p className="absolute -top-2 text-sm -right-2 bg-red-700 rounded-full py-1 px-2 ">
                  {notification.length}
                </p>
              </Link>
            </div>
            <Link to="/add_event" className="mr-5">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
