import React from "react";
import Modal from "react-modal";
import Users from "../users/Users";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { createConversation } from "../../store/actions/message/messageActions";

const NewMessage = ({ modalIsOpen, closeModal, handleFetchConversations, handleSelectConversation, conversations }: any) => {
   const users: any = useSelector((state: RootState) => state?.user?.allUsers?.data);
   const userId = useSelector((state: RootState) => state?.user?.user?.userId);

   const dispatch = useDispatch<AppDispatch>();

   const handleClick = (receiverId: any) => {
      let flag = "ok";
      let conv;
      conversations?.forEach((ob: any) => {
         if (ob?.members[0]?._id === receiverId || ob?.members[1]?._id === receiverId) {
            handleSelectConversation(ob);
            flag = "return ";
            conv = ob;
            return;
         } else {
            flag = "yes";
            console.log(ob?.members[0]?._id, "=== ", receiverId, "===", ob?.members[1]?._id);
         }
      });

      if (flag === "return ") {
         handleFetchConversations();
         handleSelectConversation(conv);
         closeModal();
         return;
      }

      const form = new FormData();
      form.append("senderId", userId || "");
      form.append("receiverId", receiverId);

      dispatch(createConversation(form)).then((response) => {
         if (response?.payload?.status === "ok") {
            closeModal();
            handleFetchConversations();
            handleSelectConversation(response?.payload?.data);
         }
      });
   };

   const afterOpenModal = () => {};

   const afterCloseModal = () => {};

   return (
      <div>
         <Modal
            appElement={document.getElementById("root") as HTMLElement}
            overlayClassName="modal-bg-overlay"
            className="bg-white w-96 py-4 overflow-auto h-96 shadow-xl rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Report Post Modal"
            onAfterOpen={afterOpenModal}
            onAfterClose={afterCloseModal}
         >
            <div className="flex flex-wrap justify-center  overflow-y-auto">
               {users?.map((user: any) => (
                  <div key={user?._id} className="user-card bg-white rounded-lg w-72 shadow-lg p-4 m-4">
                     <div className="flex items-center mb-2">
                        <div className="profile-photo mr-4 hover:cursor-pointer">
                           <img src={user?.profilePhoto} alt="Profile" className="w-20 h-16 rounded-full" onClick={() => handleClick(user?._id)} />
                        </div>
                        <div className="user-name text-lg font-semibold hover:cursor-pointer">
                           <div onClick={() => handleClick(user?._id)}>{user?.fullName}</div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </Modal>
      </div>
   );
};

export default NewMessage;
