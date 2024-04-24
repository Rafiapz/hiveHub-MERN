import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import Modal from "react-modal";
import { deleteStory, fetchAllStories } from "../../store/actions/post/postActions";
import toast from "react-hot-toast";
import Carousel from "../carousel/Carousel";

interface Story {
   userId: {
      fullName: string;
   };
   images: string[];
}

const ViewStory: React.FC<{ modalIsOpen: boolean; closeModal: () => void }> = ({ modalIsOpen, closeModal }) => {
   // const stories: any = useSelector((state: RootState) => state?.posts?.stories?.current);
   const stories: any = useSelector((state: RootState) => state?.posts?.stories?.data);

   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
   const [currentImageIndex, setCurrentImageIndex] = useState(0);

   const currentStory = stories?.[currentStoryIndex];

   const handlePrevStory = () => {
      if (!stories || stories.length === 0) return;
      setCurrentStoryIndex((prevIndex) => (prevIndex === 0 ? stories.length - 1 : prevIndex - 1));
      setCurrentImageIndex(0);
   };

   const handleNextStory = () => {
      if (!stories || stories.length === 0) return;
      setCurrentStoryIndex((prevIndex) => (prevIndex === stories.length - 1 ? 0 : prevIndex + 1));
      setCurrentImageIndex(0);
   };

   const handlePrevImage = () => {
      if (!currentStory?.images) return;
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? currentStory.images.length - 1 : prevIndex - 1));
   };

   const handleNextImage = () => {
      if (!currentStory?.images) return;
      setCurrentImageIndex((prevIndex) => (prevIndex === currentStory.images.length - 1 ? 0 : prevIndex + 1));
   };

   return (
      <Modal
         appElement={document.getElementById("root") as HTMLElement}
         overlayClassName="modal-bg-overlay"
         className="bg-white w-1/3 py-4 shadow-xl rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
         isOpen={modalIsOpen}
         onRequestClose={closeModal}
         contentLabel="Stories"
      >
         <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
               <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
                  onClick={handlePrevStory}
                  disabled={!stories || stories.length === 0}
               >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
               </button>
               <p className="text-center text-sm">{currentStory?.userId?.fullName}</p>
               <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
                  onClick={handleNextStory}
                  disabled={!stories || stories.length === 0}
               >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
               </button>
            </div>
            {currentStory && (
               <div className="mt-4">
                  <div className="relative">
                     <img
                        src={currentStory?.}
                        alt={`${currentStory?.userId?.fullName}'s story`}
                        className="w-full h-96 object-cover"
                     />
                     <div className="absolute inset-0 flex items-center justify-between px-4">
                        <button
                           className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
                           onClick={handlePrevImage}
                           disabled={!currentStory?.images}
                        >
                           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                           </svg>
                        </button>
                        <button
                           className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
                           onClick={handleNextImage}
                           disabled={!currentStory?.images}
                        >
                           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                           </svg>
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </Modal>
   );
};
export default ViewStory;

// <div className="p-4 bg-gray-100 border-b border-gray-200 rounded-t-md flex justify-between items-center">
//                <button className="text-gray-600 hover:text-gray-800 focus:outline-none" onClick={closeModal}>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                </button>
//                {current?.userId?._id === userId && (
//                   <button
//                      onClick={() => handleDeleteStory(current?._id)}
//                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
//                   >
//                      Delete Story
//                   </button>
//                )}
//             </div>
//             <img src={current?.media} alt="" className="w-full h-full object-cover" />
//             <div className="p-4">
//                <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none">Submit</button>
//                <button className="mt-2 w-full bg-gray-300 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-400 focus:outline-none">
//                   Cancel
//                </button>
//             </div>
