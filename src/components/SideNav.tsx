import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeUserName } from "../store/features/userNameSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useState } from "react";

interface menuContent {
  name: string;
  path: string;
}

interface clickedMenu {
  menuClicked: boolean;
}
export default function SideNav({ menuClicked }: clickedMenu) {
  const userName = useAppSelector((state) => state.userNameReducer.userName);
  const dispatch = useAppDispatch();

  const [nameValue, setNameValue] = useState<string>("");
  const [editUser, setEditUser] = useState<boolean>(false);
  return (
    <div>
      <div className={`${!menuClicked && "hidden"} md:block my-10`}>
        <div className="flex items-center tracking-wide">
          <FontAwesomeIcon
            icon={faUser}
            className="h-6 rounded-full bg-emerald-900 p-2"
          />
          <div className="-ml-4 px-6 mt-4">
            <p className=" text-xl">{userName}</p>
            <p
              className="text-sm text-center"
              onClick={() => setEditUser(true)}
            >
              {!editUser && "Edit"}
            </p>
          </div>
        </div>

        {/* Change user name */}
        {editUser && (
          <div className="mt-3">
            <input
              value={nameValue}
              type="text"
              className="w-28 outline-none rounded py-3 px-1 h-4 bg-gray-800 mr-2"
              onChange={(e) => setNameValue(e.target.value)}
            />
            <span
              onClick={() => {
                dispatch(changeUserName(nameValue));
                setEditUser(false);
                setNameValue("");
              }}
            >
              save
            </span>
          </div>
        )}
        <div className="my-16">
          <button className=" bg-red-600 w-full rounded-md">Reset</button>
        </div>
      </div>
    </div>
  );
}
