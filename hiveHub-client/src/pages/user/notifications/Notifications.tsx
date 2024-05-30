import  { FC } from "react";
import Notification from "../../../components/notification/Notification";
import RightSideBar from "../../../components/rightSideBar/RightSideBar";
import Menu from "../../../components/menu/Menu";
import Header from "../../../components/header/Header";

const Notifications: FC = () => {
   return (
      <div>
         <Menu />
         <Header />

         <Notification message="This is a success notification" type="success" />

         <RightSideBar />
      </div>
   );
};

export default Notifications;
