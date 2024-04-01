import { Link, Outlet } from "react-router-dom";
import Comments from "../../../components/comments/Comments";
import ConverPhoto from "../../../components/converPhoto/CoverPhoto";
import Menu from "../../../components/menu/Menu";
import RightSideBar from "../../../components/rightSideBar/RightSideBar";
import UnfollowModal from "../../../components/modal/UnfollowModal";

function Profile() {
   return (
      <>
         <Menu />
         <ConverPhoto />
         <div className="flex pl-96 pt-16 items-center gap-11 h-32 w-full">
            <Link to={"/profile"} className="px-2 py-1  rounded-md text-black font-bold text-xl u focus:outline-none underline underline-offset-2">
               Posts
            </Link>
            <Link
               to={"/profile/following"}
               className="px-2 py-1  font-bold text-xl  rounded-md text-black  focus:outline-none underline underline-offset-2"
            >
               Following
            </Link>
            <Link
               to={"/profile/followers"}
               className="px-2 py-1 font-bold text-xl rounded-md text-black  focus:outline-none underline underline-offset-2"
            >
               Followers
            </Link>
         </div>

         <Outlet />
         <Comments />
         <UnfollowModal />
         <RightSideBar />
      </>
   );
}

export default Profile;
