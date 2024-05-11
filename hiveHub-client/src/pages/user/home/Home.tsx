import Menu from "../../../components/menu/Menu";
import Story from "../../../components/story/Story";
import RightSideBar from "../../../components/rightSideBar/RightSideBar";
import Posts from "../../../components/post/Posts";
import CreatePostModal from "../../../components/modal/CreatePostModal";
import EditPostModal from "../../../components/modal/EditPostModal";
import Comments from "../../../components/comments/Comments";
import ReportPost from "../../../components/reportPost/ReportPost";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchAllposts } from "../../../store/actions/post/postActions";
import toast from "react-hot-toast";
import ViewStory from "../../../components/story/ViewStory";
import SharePost from "../../../components/share/SharePost";
import PostLikesModal from "../../../components/modal/PostLikesModal";

const Home: FC = () => {
   const [modalIsOpen, setIsOpen] = useState(false);
   const [storyViewing, setStoryViewing] = useState<boolean>(false);
   const userData: any = useSelector((state: RootState) => state?.user?.user?.data);
   const [sharePostModalIsOpen, setSharePostModalIsOpen] = useState(false);

   const dispatch = useDispatch<AppDispatch>();

   const openModal = () => {
      setIsOpen(true);
   };
   const closeModal = () => {
      setIsOpen(false);
   };

   const handleStoryView = () => {
      setStoryViewing(false);
   };

   const openSharePostModal = () => {
      setSharePostModalIsOpen(true);
   };

   const closeSharePostModal = () => {
      setSharePostModalIsOpen(false);
   };

   return (
      <>
         {userData?.role === "admin" ? (
            <div className="bg-gray-100 ">
               <Menu />
               <div className="flex  ml-80 overflow-hidden ">
                  <Posts openModal={openModal} openSharePostModal={openSharePostModal} />
               </div>
               <CreatePostModal />
               <EditPostModal />
               <ReportPost modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} />
               <Comments />
               <ViewStory modalIsOpen={storyViewing} closeModal={handleStoryView} />
               <RightSideBar />
            </div>
         ) : (
            <div className="bg-gray-100 ">
               <Menu />
               <div className="flex  ml-80 overflow-hidden">
                  <Story setView={setStoryViewing} />
               </div>
               <div className="flex  ml-80 overflow-hidden ">
                  <Posts openModal={openModal} openSharePostModal={openSharePostModal} />
               </div>
               <CreatePostModal />
               <ReportPost modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} />
               <Comments />

               <ViewStory modalIsOpen={storyViewing} closeModal={handleStoryView} />
               <SharePost modalIsOpen={sharePostModalIsOpen} closeModal={closeSharePostModal} />
               <RightSideBar />
            </div>
         )}
      </>
   );
};

export default Home;
