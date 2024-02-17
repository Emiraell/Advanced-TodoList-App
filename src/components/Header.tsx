import { faBell, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface menuContent {
  name: string;
  path: string;
}
export default function Header() {
  const [nameValue, setNameValue] = useState<string>("");
  const [editUser, setEditUser] = useState<boolean>(false);
  const [menuClicked, setMenuClicked] = useState<boolean>(false);
  const menuContents: menuContent[] = [
    { name: "Completed Event", path: "completed" },
    { name: "Bookmarks", path: "bookmarks" },
    { name: "Trash", path: "trash" },
  ];

  const [userName, setUserName] = useState<string>(
    localStorage.getItem("name") || "user"
  );

  useEffect(() => {
    localStorage.setItem("name", userName);
  }, [userName]);
  return (
    <div>
      <div className="py-10 px-7 flex fixed left-0 right-0 justify-between z-10">
        <div>
          <div onClick={() => setMenuClicked(!menuClicked)}>
            <FontAwesomeIcon
              icon={faUser}
              className={`h-8 ${menuClicked && "hidden"}`}
            />{" "}
            <div
              className={`flex font-rochester items-center justify-between  ${
                !menuClicked && "hidden"
              }`}
            >
              <p>
                <span className="text-red-600 ">Emirael</span> Todo
              </p>
              <FontAwesomeIcon icon={faX} className={`h-5`} />
            </div>
          </div>

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
                    setUserName(nameValue);
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
        <div className="flex justify-evenly w-20 ">
          <FontAwesomeIcon icon={faBell} />
        </div>
      </div>
    </div>
  );
}
