import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import Modal from "react-modal";
import { deleteStory, fetchAllStories } from "../../store/actions/post/postActions";
import toast from "react-hot-toast";

const ViewStory = ({ modalIsOpen, closeModal }: any) => {
   const current: any = useSelector((state: RootState) => state?.posts?.stories?.current);
   const userId = useSelector((state: RootState) => state?.user?.user?.userId);

   const dispatch = useDispatch<AppDispatch>();

   const handleDeleteStory = (id: any) => {
      dispatch(deleteStory(id)).then((response) => {
         if (response?.payload?.status === "ok") {
            toast.success("Succefully deleted story");
            dispatch(fetchAllStories(userId));
         } else {
            toast.error("Faild to delete Story");
         }
         closeModal();
      });
   };

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <Modal
            appElement={document.getElementById("root") as HTMLElement}
            overlayClassName="modal-bg-overlay"
            className="bg-white max-w-full overflow-hidden shadow-xl rounded-md absolute h-2/3 w-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 md:translate-y-0"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Report Post Modal"
         >
            <div className="p-4 bg-gray-100 border-b border-gray-200 rounded-t-md flex justify-between items-center">
               <button className="text-gray-600 hover:text-gray-800 focus:outline-none" onClick={closeModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
               </button>
               {current?.userId?._id === userId && (
                  <button
                     onClick={() => handleDeleteStory(current?._id)}
                     className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
                  >
                     Delete Story
                  </button>
               )}
            </div>
            <img src={current?.media} alt="" className="w-full h-full object-cover" />
            <div className="p-4">
               <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none">Submit</button>
               <button className="mt-2 w-full bg-gray-300 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-400 focus:outline-none">
                  Cancel
               </button>
            </div>
         </Modal>
      </div>
   );
};

export default ViewStory;
