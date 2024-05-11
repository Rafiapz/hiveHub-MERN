import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useEffect, useState } from "react";
import AddStory from "../addStory/AddStory";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchAllStories, fetchOthersStory, storySeen } from "../../store/actions/post/postActions";
import { setCurrentStory } from "../../store/slices/posts/postSlice";

const Story: FC<any> = ({ setView }: any) => {
   const [modalIsOpen, setModalIsOpen] = useState(false);
   const stories: any = useSelector((state: RootState) => state?.posts?.stories?.data);
   const userId: any = useSelector((state: RootState) => state?.user?.user?.userId);
   const myStories: any = useSelector((state: RootState) => state?.posts?.stories?.myStories);

   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      dispatch(fetchAllStories(userId));
   }, []);

   const closeModal = () => {
      setModalIsOpen(false);
   };

   const handleCurrentStory = (story: any, index: number, myStoryId?: any) => {
      setView(true);

      if (myStoryId) {
         let myStoryIndex;

         stories?.forEach((ob: any, i: number) => {
            if (ob?._id === myStoryId) {
               myStoryIndex = i;
            }
         });

         dispatch(setCurrentStory({ index: myStoryIndex }));
         const form = new FormData();
         form.append("userId", userId);
         form.append("storyId", myStoryId);
         dispatch(storySeen(form)).then(() => {
            dispatch(fetchAllStories(userId));
         });
      } else {
         dispatch(setCurrentStory({ index }));
         const form = new FormData();
         form.append("userId", userId);
         form.append("storyId", story?._id);
         dispatch(storySeen(form)).then(() => {
            dispatch(fetchAllStories(userId));
         });
         dispatch(fetchOthersStory(story?.userId?._id));
      }
   };

   return (
      <div className="flex items-center justify-center p-4 bg-gray-50 w-2/3 ml-10 ">
         <li className="flex flex-col items-center space-y-2">
            <div className={`bg-gradient-to-tr rounded-full p-1 relative ${myStories?.[0]?.seenBy?.some((ob: any) => ob === userId) ? "" : ""}`}>
               <div className="block bg-white p-1 rounded-full transform transition hover:-rotate-12 duration-300">
                  {myStories?.length <= 0 || myStories?.[0]?.media.length <= 0 ? (
                     <img className="h-24 w-24 rounded-full " src="https://i.ibb.co/yhh0Ljy/profile.jpg" alt="image" />
                  ) : (
                     <img
                        className="h-24 w-24 rounded-full object-cover"
                        src={myStories?.[0]?.media[0]}
                        alt="https://i.ibb.co/yhh0Ljy/profile.jp"
                        onClick={() => handleCurrentStory(myStories?.[0], 0, myStories?.[0]?._id)}
                     />
                  )}
               </div>

               <button
                  onClick={() => setModalIsOpen(true)}
                  className="transition duration-500 absolute bottom-0 right-0 bg-blue-700 h-8 w-8 rounded-full text-white text-2xl font-semibold border-4 border-white flex justify-center items-center hover:bg-blue-900"
               >
                  +
               </button>
            </div>
            <p>you</p>
         </li>

         <AddStory modalIsOpen={modalIsOpen} closeModal={closeModal} />
         {stories?.map((story: any, i: number) => (
            <div key={story?._id}>
               {story?.userId._id !== userId && (
                  <li className="flex flex-col items-center space-y-2" onClick={() => handleCurrentStory(story, i)}>
                     <div
                        className={`bg-gradient-to-tr rounded-full p-1 ${
                           story?.seenBy?.some((ob: any) => ob === userId) ? "" : "from-yellow-500 to-pink-600"
                        }`}
                     >
                        <div className="block bg-white p-1 rounded-full transform transition hover:-rotate-12 duration-300">
                           <img className="h-24 w-24 rounded-full object-cover" src={story?.media[0]} alt="image" />
                        </div>
                     </div>
                     <p>{story?.userId?.fullName}</p>
                  </li>
               )}
            </div>
         ))}
      </div>
   );
};

export default Story;
