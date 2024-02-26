import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeUserName, resetUserName } from "../store/features/userNameSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useState } from "react";
import { Link } from "react-router-dom";
import { resetNotifications } from "../store/features/notificationSlice";
import { reset } from "../store/features/Tasks";

interface clickedMenu {
  menuClicked: boolean;
  notification: number;
}
export default function SideNav({ menuClicked, notification }: clickedMenu) {
  const userName = useAppSelector((state) => state.userNameReducer.userName);
  const dispatch = useAppDispatch();

  const [nameValue, setNameValue] = useState<string>(userName);
  // const [name, setName] = useState<string>();
  const [editUser, setEditUser] = useState<boolean>(false);

  const resetAll = () => {
    dispatch(reset());
    dispatch(resetUserName());
    dispatch(resetNotifications());
    console.log("reset");
  };

  return (
    <div className={`mt-12 md:mt-16 md:block ${!menuClicked && "hidden"} px-6`}>
      <div className=" flex">
        <FontAwesomeIcon icon={faUser} />
        <p className="px-4">{userName}</p>
      </div>
      <div>
        <input
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          type="text"
          className={`w-36 py-1 px-1 bg-gray-800 rounded mr-2 outline-none text-sm my-2 ${
            !editUser && "hidden"
          }`}
        />
        <p
          className=" text-center text-xl"
          onClick={() => {
            dispatch(changeUserName(nameValue));
            setNameValue("");
            setEditUser(!editUser);
          }}
        >
          {editUser ? "Save" : "Edit"}
        </p>
      </div>

      <div className="my-16 text-xl">
        <Link to="/add_event" className="hidden md:block">
          Add Event
        </Link>
        <div className="relative mr-10 my-9 hidden md:block">
          <Link to="/notifications">
            Notifications
            <p className="absolute -top-2 text-sm -right-2 bg-red-700 rounded-full py-1 px-2 ">
              {notification}
            </p>
          </Link>
        </div>
        <button
          className="bg-red-600 w-36 rounded-md text-xl p-2 duration-0.5 hover:opacity-80"
          onClick={resetAll}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
