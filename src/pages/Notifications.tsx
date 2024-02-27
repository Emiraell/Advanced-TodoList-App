import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  messages,
  removeNotification,
} from "../store/features/notificationSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const history = useNavigate();
  const notifications: messages[] = useAppSelector(
    (state) => state.notificationReducer.notifications
  );

  const dispatch = useAppDispatch();
  return (
    <div className="m-auto w-[85%] md:w-[60%] lg:w-[40%] py-10 tracking-wider text-lg">
      <div className="flex">
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => history("/home")}
          className="text-2xl"
        />
        <h2 className=" text-center text-xl font-montserrat px-20 md:px-32 lg:px-36">
          Notifications
        </h2>
      </div>

      <div className="my-10">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="flex justify-between px-10 py-4 items-center border-b"
          >
            <div className="flex items-center">
              <span>{index + 1}</span>{" "}
              <div className="pl-5">
                <p className=" text-emerald-600 font-semibold">
                  {notification.header}
                </p>
                <p className=" italic">{notification.message}</p>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faTrash}
              className=" text-red-500"
              onClick={() => dispatch(removeNotification(notification))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
