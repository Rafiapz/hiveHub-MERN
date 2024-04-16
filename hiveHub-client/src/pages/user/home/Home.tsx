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
import { io } from "socket.io-client";
import { setSocket } from "../../../store/slices/messages/messagesSlice";
import ViewStory from "../../../components/story/ViewStory";
const socket = io("http://localhost:7700");

const Home: FC = () => {
   const [modalIsOpen, setIsOpen] = useState(false);
   const likes: any = useSelector((state: RootState) => state?.posts?.posts?.likes);
   const posts: any = useSelector((state: RootState) => state.posts.posts.data);
   const userId = useSelector((state: RootState) => state?.user?.user?.userId);
   const [storyViewing, setStoryViewing] = useState<boolean>(false);

   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      dispatch(fetchAllposts()).then((data) => {
         if (data?.payload?.status !== "ok")
            toast(data?.payload?.message, {
               style: { backgroundColor: "#ff6347", color: "#eeeeee" },
            });
         console.log("pro", posts);
      });
   }, []);

   useEffect(() => {
      dispatch(setSocket({ socket }));
      socket.emit("addUser", userId);
   }, []);

   const openModal = () => {
      setIsOpen(true);
   };
   const closeModal = () => {
      setIsOpen(false);
   };

   const handleStoryView = () => {
      setStoryViewing(!storyViewing);
   };

   return (
      <div className="bg-gray-100 ">
         {/* <Menu /> */}
         {/* <div className="flex  ml-80 overflow-hidden">
            <Story setView={setStoryViewing} />
         </div> */}
         {/* <div className="flex  ml-80 overflow-hidden ">
            <Posts openModal={openModal} likes={likes} posts={posts} />
         </div>
         <CreatePostModal />
         <EditPostModal />
         <ReportPost modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} />
         <Comments /> */}
         <ViewStory view={storyViewing} setView={setStoryViewing} />
         {/* <RightSideBar /> */}
      </div>
   );
};

export default Home;
