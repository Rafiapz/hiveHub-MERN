import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useEffect, useState } from "react";
import AddStory from "../addStory/AddStory";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchAllStories } from "../../store/actions/post/postActions";
import { setCurrentStory } from "../../store/slices/posts/postSlice";

const Story: FC<any> = ({ setView }: any) => {
   const [modalIsOpen, setModalIsOpen] = useState(false);
   const stories: any = useSelector((state: RootState) => state?.posts?.stories?.data);
   const userId = useSelector((state: RootState) => state?.user?.user?.userId);
   const myStories: any = useSelector((state: RootState) => state?.posts?.stories?.myStories);

   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      dispatch(fetchAllStories(userId));
   }, []);

   const closeModal = () => {
      setModalIsOpen(false);
   };

   const handleCurrentStory = (story: any) => {
      setView(true);

      dispatch(setCurrentStory({ data: story }));
   };

   return (
      <div className="flex items-center justify-center p-4 bg-gray-50 w-2/3 ml-10 ">
         <li className="flex flex-col items-center space-y-2">
            <div className="bg-gradient-to-tr from-yellow-500 to-pink-600 rounded-full p-1 relative">
               <a className="block bg-white p-1 rounded-full transform transition hover:-rotate-12 duration-300" href="#">
                  {myStories?.length <= 0 ? (
                     <img className="h-24 w-24 rounded-full" src="https://i.ibb.co/yhh0Ljy/profile.jpg" alt="image" />
                  ) : (
                     <img
                        className="h-24 w-24 rounded-full"
                        src={myStories !== null && myStories[0]?.media}
                        alt="image"
                        onClick={() => handleCurrentStory(myStories[0])}
                     />
                  )}
               </a>

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
         {stories?.map((story: any) => (
            <>
               {story?.userId._id !== userId && (
                  <li key={story?._id} className="flex flex-col items-center space-y-2" onClick={() => handleCurrentStory(story)}>
                     <div className="bg-gradient-to-tr from-yellow-500 to-pink-600 rounded-full p-1">
                        <a className="block bg-white p-1 rounded-full transform transition hover:-rotate-12 duration-300" href="#">
                           <img className="h-24 w-24 rounded-full" src={story?.media} alt="image" />
                        </a>
                     </div>
                     <p>{story?.userId?.fullName}</p>
                  </li>
               )}
            </>
         ))}
      </div>
   );
};

export default Story;
