import Menu from "../../../components/menu/Menu";
import Story from "../../../components/story/Story";
import RightSideBar from "../../../components/rightSideBar/RightSideBar";
import Posts from "../../../components/post/Posts";
import CreatePostModal from "../../../components/modal/CreatePostModal";
import EditPostModal from "../../../components/modal/EditPostModal";
import Comments from "../../../components/comments/Comments";
import ReportPost from "../../../components/reportPost/ReportPost";
import { useState } from "react";

function Home() {
   const [modalIsOpen, setIsOpen] = useState(false);

   function openModal() {
      setIsOpen(true);
   }
   function closeModal() {
      setIsOpen(false);
   }
   return (
      <div className="bg-gray-100">
         <Menu />
         <Story />
         <Posts openModal={openModal} />
         <CreatePostModal />
         <EditPostModal />
         <ReportPost modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} />
         <Comments />
         <RightSideBar />
      </div>
   );
}

export default Home;
