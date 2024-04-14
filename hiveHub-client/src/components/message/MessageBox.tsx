import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faVideo } from "@fortawesome/free-solid-svg-icons";
import Chat from "./Chat";
import { createConversation, createMessage, fetchChats } from "../../store/actions/message/messageActions";
import { fetchConversations } from "../../service/api";
import { connect, io } from "socket.io-client";
import { newMessage } from "../../store/slices/messages/messagesSlice";
const socket = io("http://localhost:7700");

const MessageBox: FC = () => {
   const userId = useSelector((state: RootState) => state?.user?.user?.userId);
   const [curChat, setCurChat] = useState<any>(null);
   const [conversations, setConversations] = useState<any>([]);
   // const messages: string[] = useSelector((state: RootState) => state?.messages?.messages);
   const [messages, setMessages] = useState<any>([]);
   const scrollRef = useRef<any>();
   const dispatch = useDispatch<AppDispatch>();
   const [message, setMessage] = useState<string>("");
   const [arrivalMessage, setArrivalMessage] = useState<any>(null);
   const [onlineUsers, setOnlineUsers] = useState<any>([]);

   useEffect(() => {
      socket.on("recieveMessage", (data: any) => {
         setArrivalMessage({
            message: data?.message,
            createdAt: Date.now(),
            senderId: data?.senderId,
         });
      });
   }, [socket]);

   useEffect(() => {
      if (curChat?.members[0]?._id === arrivalMessage?.senderId || curChat?.members[1]?._id === arrivalMessage?.senderId) {
         setMessages((prev: any) => [...prev, arrivalMessage]);
      }
   }, [arrivalMessage]);

   useEffect(() => {
      fetchConversations(userId || "").then((response: any) => {
         setConversations(response?.data?.conversations);
      });
   }, [userId]);

   useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   useEffect(() => {
      socket.emit("addUser", userId);
      socket.on("getUsers", (users) => {
         setOnlineUsers(users);
      });
   }, [userId]);

   const handleSelectConversation = (chat: any) => {
      setCurChat(chat);

      dispatch(fetchChats(chat?._id)).then((response) => {
         setMessages(response?.payload?.data);
      });

      // const form = new FormData();

      // form.append("senderId", userId || "");
      // form.append("recieverId", chat?.members[1]?._id);

      // dispatch(createConversation(form));
   };

   const handleSubmit = (event: any) => {
      event.preventDefault();

      // const receiverId = curChat.members.find((member: any) => member !== userId);

      let receiverId;

      if (curChat?.members[0]._id === userId) {
         receiverId = curChat.members[1]._id;
      } else {
         receiverId = curChat.members[0]._id;
      }

      if (message) {
         socket.emit("sendMessage", {
            senderId: userId,
            receiverId,
            message,
         });

         setMessage("");
      }

      const form = new FormData();

      form.append("message", message);
      form.append("senderId", userId || "");
      form.append("conversationId", curChat?._id);
      dispatch(createMessage(form)).then((response) => {
         if (response?.payload?.status === "ok") {
            dispatch(fetchChats(curChat?._id)).then((response: any) => {
               setMessages(response?.payload?.data);
            });
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
                        {messages?.map((ob: any, i: number) => (
                           <div key={i + "message"} ref={scrollRef}>
                              <Chat message={ob} own={ob?.senderId === userId} />
                           </div>
                        ))}
                     </div>
                     <div className="flex items-center mt-4">
                        <input
                           type="text"
                           className="w-full p-2 border border-black rounded-md focus:outline-none"
                           placeholder="Type your message here"
                           value={message}
                           onChange={(e) => setMessage(e?.target?.value)}
                        />
                        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
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
