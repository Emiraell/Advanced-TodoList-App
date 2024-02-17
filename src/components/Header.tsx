import { faBell, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SideNav from "./SideNav";

export default function Header() {
  const [menuClicked, setMenuClicked] = useState<boolean>(false);

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
          <SideNav menuClicked={menuClicked} />
        </div>
        <div className="flex justify-evenly w-20 ">
          <FontAwesomeIcon icon={faBell} />
        </div>
      </div>
    </div>
  );
}
