import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeUserName, resetUserName } from "../store/features/userNameSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useState } from "react";
import { Link } from "react-router-dom";
import { resetNotifications } from "../store/features/notificationSlice";
import { reset } from "../store/features/Tasks";

// type of received props
interface clickedMenu {
  menuClicked: boolean;
  notification: number;
}
export default function SideNav({ menuClicked, notification }: clickedMenu) {
  // read userName state from the redux store
  const userName = useAppSelector((state) => state.userNameReducer.userName);
  const dispatch = useAppDispatch();

  const [nameValue, setNameValue] = useState<string>("");
  const [name, setName] = useState<string>(userName);
  const [editUser, setEditUser] = useState<boolean>(false);

  // reset functionality
  const resetAll = () => {
    setName("User");
    setEditUser(false);
    dispatch(reset());
    dispatch(resetUserName());
    dispatch(resetNotifications());
  };

  return (
    <div className={`mt-12 md:mt-16 md:block ${!menuClicked && "hidden"} px-6`}>
      <div className=" flex">
        <FontAwesomeIcon icon={faUser} />{" "}
        <div>
          <p className="px-4">{userName}</p>
          <div>
            <input
              value={nameValue}
              onChange={(e) => {
                setNameValue(e.target.value);
                setName(nameValue);
              }}
              type="text"
              className={`w-28 py-1 px-1 bg-gray-800 rounded mr-2 outline-none text-sm my-2 ${
                !editUser && "hidden"
              }`}
            />
            <p
              className=" text-center text-xl"
              onClick={() => {
                dispatch(changeUserName(name));
                setNameValue("");
                setEditUser(!editUser);
              }}
            >
              {editUser ? "Save" : "Edit"}
            </p>
          </div>
        </div>
      </div>

      <div className="my-16 text-xl">
        <Link to="/advanced_todolist_app/add_event" className="hidden md:block">
          Add Event
        </Link>
        <div className="relative mr-10 my-9 hidden md:block">
          <Link to="/advanced_todolist_app/notifications">
            Notifications
            <p className="absolute -top-2 text-sm -right-2 bg-red-700 rounded-full py-1 px-2 ">
              {notification}
            </p>
          </Link>
        </div>
        <button
          className="bg-red-600 w-28 rounded-md text-xl p-2 duration-0.5 hover:opacity-80"
          onClick={resetAll}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
