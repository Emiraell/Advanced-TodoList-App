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

  const menuContents: menuContent[] = [
    { name: "Completed Event", path: "completed" },
    { name: "Bookmarks", path: "bookmarks" },
    { name: "Trash", path: "trash" },
  ];

  const [nameValue, setNameValue] = useState<string>("");
  const [editUser, setEditUser] = useState<boolean>(false);
  return (
    <div>
      <div className={`${!menuClicked && "hidden"}`}>
        <div className="flex items-center tracking-wide">
          <FontAwesomeIcon icon={faUser} className="h-6" />
          <div className="-ml-4 px-6 mt-4">
            <p className=" text-xl">{userName}</p>
            <p className="text-xs" onClick={() => setEditUser(true)}>
              {!editUser && "change name"}
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
        <div className="py-5">
          {menuContents.map((content) => (
            <ol className="py-3" key={content.path}>
              {content.name}
            </ol>
          ))}
        </div>
      </div>
    </div>
  );
}
