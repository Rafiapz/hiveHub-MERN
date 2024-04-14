import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faVideo } from "@fortawesome/free-solid-svg-icons";
import Chat from "./Chat";
import { createConversation, createMessage, fetchChats } from "../../store/actions/message/messageActions";
import { fetchConversations } from "../../service/api";

const MessageBox: FC = () => {
   const users: any = useSelector((state: RootState) => state?.user?.allUsers?.data);
   const userId = useSelector((state: RootState) => state?.user?.user?.userId);
   const [curChat, setCurChat] = useState<any>(null);
   const [conversations, setConversations] = useState<any>([]);
   const messages: any = useSelector((state: RootState) => state?.messages?.messages);
   const [value, setValue] = useState<string>("");
   const scrollRef = useRef<any>();

   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      fetchConversations(userId || "").then((response: any) => {
         setConversations(response?.data?.conversations);
      });
   }, [userId]);

   useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      console.log("called scroll");
   }, [messages]);

   const handleSelectConversation = (chat: any) => {
      setCurChat(chat);

      dispatch(fetchChats(chat?._id));

      // const form = new FormData();

      // form.append("senderId", userId || "");
      // form.append("recieverId", chat?.members[1]?._id);

      // dispatch(createConversation(form));
   };

   const sendMessage = () => {
      // socket.emit("send_message", { message });

      const form = new FormData();

      form.append("message", value);
      form.append("senderId", userId || "");
      form.append("conversationId", curChat?._id);
      dispatch(createMessage(form)).then((response) => {
         if (response?.payload?.status === "ok") {
            dispatch(fetchChats(curChat?._id));
            setValue("");
         }
      });
   };

   return (
      <div className="bg-white ml-0  w-full sm:w-3/5 sm:ml-72 h-96 flex flex-col">
         <div className="flex w-full h-10 mt-5 justify-between">
            <div className="flex items-center">
               <h1 className="text-blue px-4 py-2 text-xl font-bold">New Message</h1>
            </div>
            <div className="flex items-center">
               <button className="bg-blue-700 text-white px-4 py-2 rounded mr-4">
                  <FontAwesomeIcon icon={faVideo} className="mr-2" />
                  Video Call
               </button>
               <button className="bg-blue-700 text-white px-4 py-2 rounded">
                  <FontAwesomeIcon icon={faComment} className="mr-2" />
                  Write Message
               </button>
            </div>
         </div>
         <div className="flex  flex-grow">
            <div className="flex flex-col sm:w-54">
               {conversations?.map((c: any) => (
                  <div
                     key={c?._id}
                     className="user-card bg-white hover:cursor-pointer border bottom-1 w-52 h-16 shadow-lg p-4 "
                     onClick={() => handleSelectConversation(c)}
                  >
                     <div className="flex items-center mb-2">
                        <div className="profile-photo mr-4">
                           <img
                              src={c?.members[1]?._id !== userId ? c?.members[1].profilePhoto : c?.members[0].profilePhoto}
                              alt="Profile"
                              className="w-10 h-8 rounded-full"
                           />
                        </div>
                        <div className="user-name text-sm font-semibold">
                           {c?.members[1]?._id !== userId ? c?.members[1].fullName : c?.members[0].fullName}
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {curChat ? (
               <div className="flex flex-col  sm:w-full">
                  <div style={{ height: "550px" }} className="bg-gray-100 ml-1 w-full p-4  flex flex-col">
                     <div className="flex mb-3">
                        <img
                           src={curChat?.members[1]?._id !== userId ? curChat?.members[1].profilePhoto : curChat?.members[0].profilePhoto}
                           className="w-8 rounded-lg"
                           alt=""
                        />
                        <h1 className="ml-2">{curChat?.members[1]?._id !== userId ? curChat?.members[1].fullName : curChat?.members[0].fullName}</h1>
                     </div>
                     <div className="overflow-y-auto flex-grow">
                        {messages?.map((ob: any) => (
                           <div key={ob?._id} ref={scrollRef}>
                              <Chat message={ob} own={ob?.senderId === userId} />
                           </div>
                        ))}
                     </div>
                     <div className="flex items-center mt-4">
                        <input
                           type="text"
                           className="w-full p-2 border border-black rounded-md focus:outline-none"
                           placeholder="Type your message here"
                           value={value}
                           onChange={(e) => setValue(e?.target?.value)}
                        />
                        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
                           Send
                        </button>
                     </div>
                  </div>
               </div>
            ) : (
               <>
                  {" "}
                  <span className="noConversationText">Open a conversation to start a chat.</span>
               </>
            )}
         </div>
      </div>
   );
};

export default MessageBox;
