import Menu from "../../../components/menu/Menu";
import { Link, Outlet } from "react-router-dom";
import Comments from "../../../components/comments/Comments";
import RightSideBar from "../../../components/rightSideBar/RightSideBar";
import OthersCoverPhoto from "../../../components/OthersCoverPhoto/OthersCoverPhoto";
import UnfollowModal from "../../../components/modal/UnfollowModal";

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
         <UnfollowModal />
         <RightSideBar />
      </>
   );
}

export default OthersProfile;
