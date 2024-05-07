import React, { FC } from "react";
import Notification from "../../../components/notification/Notification";
import RightSideBar from "../../../components/rightSideBar/RightSideBar";
import Menu from "../../../components/menu/Menu";

const Notifications: FC = () => {
   return (
      <div>
         <Menu />
         <div className=" ml-80 overflow-hidden ">
            <h1 className="font-bold text-xl mt-5 mb-3">Notifications </h1>
            <Notification message="This is a success notification" type="success" />
         </div>
         <RightSideBar />
      </div>
   );
};

export default Notifications;
