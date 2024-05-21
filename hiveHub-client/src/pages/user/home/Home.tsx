import { FC, Suspense, lazy, useEffect, useState } from "react";

const Menu = lazy(() => import("../../../components/menu/Menu"));
const Story = lazy(() => import("../../../components/story/Story"));
const RightSideBar = lazy(() => import("../../../components/rightSideBar/RightSideBar"));
const Posts = lazy(() => import("../../../components/post/Posts"));
const CreatePostModal = lazy(() => import("../../../components/modal/CreatePostModal"));
const EditPostModal = lazy(() => import("../../../components/modal/EditPostModal"));
const Comments = lazy(() => import("../../../components/comments/Comments"));
const ReportPost = lazy(() => import("../../../components/reportPost/ReportPost"));
const ViewStory = lazy(() => import("../../../components/story/ViewStory"));
const SharePost = lazy(() => import("../../../components/share/SharePost"));
const PostLikesModal = lazy(() => import("../../../components/modal/PostLikesModal"));
const Poll = lazy(() => import("../../../components/Polls/Poll"));
import Popup from "../../../components/notification/Popup";
import Loading from "../../../components/loading/Loading";

import socketService from "../../../service/socketService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchAllposts } from "../../../store/actions/post/postActions";
import toast from "react-hot-toast";
import LoadingFalBack from "../../../components/loading/LoadingFalBack";
import Header from "../../../components/header/Header";

const socket = socketService.socket;

const Home: FC = () => {
   const [modalIsOpen, setIsOpen] = useState(false);
   const [storyViewing, setStoryViewing] = useState<boolean>(false);
   const userData: any = useSelector((state: RootState) => state?.user?.user?.data);
   const [sharePostModalIsOpen, setSharePostModalIsOpen] = useState(false);
   const [notified, setNotified] = useState<boolean>(false);
   const [notificationData, setNotionData] = useState<any>(null);
   const userId: any = useSelector((state: RootState) => state.user.user.userId);

   useEffect(() => {
      socket.on("getNotifiation", (data) => {
         if (data?.senderId !== userId) {
            setNotionData(data);
            setNotified(true);
         }
      });
   }, [socket]);

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
               <Suspense fallback={<LoadingFalBack />}>
                  <Menu />
               </Suspense>
               <Suspense fallback={<LoadingFalBack />}>
                  <div className="flex  ml-80 overflow-hidden ">
                     <Posts openModal={openModal} openSharePostModal={openSharePostModal} />
                  </div>
               </Suspense>
               <Suspense fallback={<LoadingFalBack />}>
                  <CreatePostModal />
               </Suspense>
               <Suspense fallback={<LoadingFalBack />}>
                  <EditPostModal />
               </Suspense>
               <Suspense fallback={<LoadingFalBack />}>
                  <ReportPost modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} />
               </Suspense>
               <Suspense fallback={<LoadingFalBack />}>
                  <Comments />
               </Suspense>
               <Suspense fallback={<LoadingFalBack />}>
                  <ViewStory modalIsOpen={storyViewing} closeModal={handleStoryView} />
               </Suspense>
               <Suspense fallback={<LoadingFalBack />}>
                  <RightSideBar />
               </Suspense>
            </div>
         ) : (
            <div className="bg-gray-100 ">
               <Suspense fallback={<LoadingFalBack />}>
                  <Menu />
               </Suspense>
               <Header />
               <Suspense fallback={<LoadingFalBack />}>
                  <Story setView={setStoryViewing} />
               </Suspense>
               <Suspense fallback={<LoadingFalBack />}>
                  <Poll />
               </Suspense>
               <Popup notification={notified} data={notificationData} />
               <Suspense fallback={<LoadingFalBack />}>
                  <Posts openModal={openModal} openSharePostModal={openSharePostModal} />
               </Suspense>
               <Suspense fallback={<LoadingFalBack />}>
                  <CreatePostModal />
               </Suspense>
               <Suspense fallback={<LoadingFalBack />}>
                  <ReportPost modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} />
               </Suspense>
               <Suspense fallback={<LoadingFalBack />}>
                  <Comments />
               </Suspense>
               <Suspense fallback={<LoadingFalBack />}>
                  <ViewStory modalIsOpen={storyViewing} closeModal={handleStoryView} />
               </Suspense>
               <Suspense fallback={<LoadingFalBack />}>
                  <SharePost modalIsOpen={sharePostModalIsOpen} closeModal={closeSharePostModal} />
               </Suspense>
               <Suspense fallback={<LoadingFalBack />}>
                  <RightSideBar />
               </Suspense>
            </div>
         )}
      </>
   );
};

export default Home;
