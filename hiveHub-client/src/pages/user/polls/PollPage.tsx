import React, { FC } from "react";
import Menu from "../../../components/menu/Menu";
import PollInput from "../../../components/Polls/PollInput";
import RightSideBar from "../../../components/rightSideBar/RightSideBar";

const PollPage: FC = () => {
   return (
      <>
         <Menu />
         <PollInput />
         <RightSideBar />
      </>
   );
};

export default PollPage;
