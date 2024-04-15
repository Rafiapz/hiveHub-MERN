import { FC } from "react";
import Menu from "../../components/menu/Menu";
import RightSideBar from "../../components/rightSideBar/RightSideBar";
import MessageBox from "../../components/message/MessageBox";
import NewMessage from "../../components/newMessage/NewMessage";

const Messages: FC = () => {
   return (
      <>
         <Menu />
         <MessageBox />
         <RightSideBar />
      </>
   );
};

export default Messages;
