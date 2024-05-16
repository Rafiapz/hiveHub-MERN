import Menu from "../../../components/menu/Menu";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import Comments from "../../../components/comments/Comments";
import RightSideBar from "../../../components/rightSideBar/RightSideBar";
import OthersCoverPhoto from "../../../components/OthersCoverPhoto/OthersCoverPhoto";
import UnfollowModal from "../../../components/modal/UnfollowModal";
import { useState } from "react";

function OthersProfile() {
   const [searchQuery] = useSearchParams();
   const [classs, setClasss] = useState({
      posts: "font-bold underline underline-offset-2",
      following: "",
      polls: "",
      followers: "",
      likes: "",
      reports: "",
   });

   const target = searchQuery.get("userId");

   const handleClick = (position: string) => {
      setClasss((prev) => {
         return {
            ...prev,
            followers: "",
            posts: "",
            polls: "",
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
         <OthersCoverPhoto />
         <div className="flex pl-96 pt-16 mt-8 items-center gap-11 h-32 w-full">
            <Link
               onClick={() => handleClick("posts")}
               to={"/others-profile"}
               className={`px-2 py-1 ${classs.posts}   rounded-md text-black text-xl u focus:outline-none `}
            >
               Posts
            </Link>
            <Link
               onClick={() => handleClick("polls")}
               to={`/others-profile/polls?userId=${target}`}
               className={`px-2 py-1 ${classs.polls} rounded-md text-black text-xl u focus:outline-none `}
            >
               Polls
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
