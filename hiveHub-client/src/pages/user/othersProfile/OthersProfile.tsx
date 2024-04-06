import React from "react";
import Menu from "../../../components/menu/Menu";
import ConverPhoto from "../../../components/converPhoto/CoverPhoto";
import { Link, Outlet } from "react-router-dom";
import Comments from "../../../components/comments/Comments";
import UnfollowModal from "../../../components/modal/UnfollowModal";
import RightSideBar from "../../../components/rightSideBar/RightSideBar";
import OthersCoverPhoto from "../../../components/OthersCoverPhoto/OthersCoverPhoto";

function OthersProfile() {
   return (
      <>
         <Menu />
         <OthersCoverPhoto />
         <div className="flex pl-96 pt-16 items-center gap-11 h-32 w-full">
            <Link to={"/profile"} className="px-2 py-1  rounded-md text-black font-bold text-xl u focus:outline-none underline underline-offset-2">
               Posts
            </Link>
         </div>

         <Outlet />
         <Comments />

         <RightSideBar />
      </>
   );
}

export default OthersProfile;
