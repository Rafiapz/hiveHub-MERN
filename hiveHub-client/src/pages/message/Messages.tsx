import { FC } from "react";
import Menu from "../../components/menu/Menu";
import { Outlet } from "react-router-dom";
import RightSideBar from "../../components/rightSideBar/RightSideBar";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faVideo } from "@fortawesome/free-solid-svg-icons";

const Messages: FC = () => {
   const users: any = useSelector((state: RootState) => state?.user?.allUsers?.data);

   const messages = [
      { id: 1, text: "Hello", type: "incoming" },
      { id: 2, text: "Hi", type: "outgoing" },
      // Add more messages as needed
   ];

   return (
      <>
         <Menu />
         <div className="bg-white ml-72 w-3/5 h-full flex flex-col">
            <div className="flex w-full h-10 mt-5 justify-between">
               <div className="flex items-center">
                  <h1 className="text-blue px-4 py-2 text-xl font-bold">New Message</h1> {/* Changed to heading */}
               </div>
               <div className="flex items-center">
                  <button className="bg-blue-700 text-white px-4 py-2 rounded mr-4">
                     <FontAwesomeIcon icon={faVideo} className="mr-2" /> {/* Video Call icon */}
                     Video Call
                  </button>
                  <button className="bg-blue-700 text-white px-4 py-2 rounded">
                     <FontAwesomeIcon icon={faComment} className="mr-2" /> {/* Message icon */}
                     Write Message
                  </button>
               </div>
            </div>
            <div className="flex flex-grow">
               <div className="flex flex-col ">
                  {users.map((user: any) => (
                     <div key={user?._id} className="user-card bg-white border bottom-1 w-52 h-16 shadow-lg p-4 ">
                        <div className="flex items-center mb-2">
                           <div className="profile-photo mr-4">
                              <img src={user?.profilePhoto} alt="Profile" className="w-10 h-8 rounded-full" />
                           </div>
                           <div className="user-name text-sm font-semibold">{user?.fullName}</div>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="flex flex-col  w-2/3" style={{ width: "calc(100% + 20px)" }}>
                  <div className="bg-gray-100 min-h-96 ml-1 w-full p-4 h-full min flex flex-col justify-between">
                     <div className="flex mb-3  ">
                        <img src="http://localhost:7700/posts/image-1711986406317-792216078" className="w-10 rounded-lg" alt="" />
                        <h1 className="ml-2">userName</h1>
                     </div>
                     <div className="overflow-y-auto flex-grow">
                        {messages.map((message) => (
                           <div
                              key={message.id}
                              className={`message-${message.type} mb-2 p-2 bg-green-200 rounded-md ${message.type === "outgoing" ? "ml-auto" : ""}`}
                           >
                              {message.text}
                           </div>
                        ))}
                     </div>
                     <div className="flex items-center mt-4">
                        <input type="text" className="w-full p-2 border rounded-md focus:outline-none" placeholder="Type your message here" />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <RightSideBar />
      </>
   );
};

export default Messages;
