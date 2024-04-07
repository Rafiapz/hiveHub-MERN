import { Link, Outlet } from "react-router-dom";
import Comments from "../../../components/comments/Comments";
import ConverPhoto from "../../../components/converPhoto/CoverPhoto";
import Menu from "../../../components/menu/Menu";
import RightSideBar from "../../../components/rightSideBar/RightSideBar";
import UnfollowModal from "../../../components/modal/UnfollowModal";
import { useState } from "react";
import CreatePostModal from "../../../components/modal/CreatePostModal";
import EditPostModal from "../../../components/modal/EditPostModal";

function Profile() {
   const [classs, setClasss] = useState({ posts: "font-bold underline underline-offset-2", following: "", followers: "", likes: "", reports: "" });

   const handleClick = (position: string) => {
      setClasss((prev) => {
         return {
            ...prev,
            followers: "",
            posts: "",
            following: "",
            likes: "",
            reports: "",
            [position]: "font-bold underline underline-offset-2",
         };
      });
   };

   return (
      <>
         <Menu />
         <ConverPhoto />
         <div className="flex pl-96 pt-16 items-center gap-11 h-32 w-full">
            <Link
               onClick={() => handleClick("posts")}
               to={"/profile"}
               className={`px-2 py-1 ${classs.posts} rounded-md text-black text-xl u focus:outline-none `}
            >
               Posts
            </Link>
            <Link
               onClick={() => handleClick("following")}
               to={"/profile/following"}
               className={`px-2 py-1   text-xl ${classs.following}  rounded-md text-black  focus:outline-none `}
            >
               Following
            </Link>
            <Link
               onClick={() => handleClick("followers")}
               to={"/profile/followers"}
               className={`px-2 py-1  text-xl rounded-md ${classs.followers} text-black  focus:outline-none `}
            >
               Followers
            </Link>
            <Link
               onClick={() => handleClick("likes")}
               to={"/profile/likes"}
               className={`px-2 py-1  text-xl rounded-md ${classs.likes} text-black  focus:outline-none `}
            >
               Likes
            </Link>
            <Link
               onClick={() => handleClick("reports")}
               to={"/profile/reports"}
               className={`px-2 py-1  text-xl rounded-md ${classs.reports} text-black  focus:outline-none `}
            >
               Reports
            </Link>
         </div>

         <Outlet />
         <CreatePostModal />
         <EditPostModal />
         <Comments />
         <UnfollowModal />
         <RightSideBar />
      </>
   );
}

export default Profile;
