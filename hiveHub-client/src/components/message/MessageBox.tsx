import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faComment, faFileImage, faFileVideo, faVideo } from "@fortawesome/free-solid-svg-icons";
import Chat from "./Chat";
import { createConversation, createMessage, fetchChats } from "../../store/actions/message/messageActions";
import { fetchConversations, fetchOnlineUsers, isUserBlocked, sendVideo, unblockOtherUser } from "../../service/api";
import NewMessage from "../newMessage/NewMessage";
import VideoCall from "../videoCall/VideoCall";
import EmojiPicker from "emoji-picker-react";
import ReactPlayer from "react-player";
import LoadingButton from "../loading/LoadingButton";
import toast from "react-hot-toast";
import AudioRecorderComponent from "../audioRecorder/AudioRecorder";
import { format } from "timeago.js";
import socketService from "../../service/socketService";
import { useSearchParams } from "react-router-dom";
import { fetchuser } from "../../store/actions/auth/userActions";
import Conversations from "./Conversations";
const socket = socketService.socket;

const MessageBox: FC = () => {
   const userId: any = useSelector((state: RootState) => state?.user?.user?.userId);
   const [curChat, setCurChat] = useState<any>(null);
   const [conversations, setConversations] = useState<any>([]);
   const [messages, setMessages] = useState<any>([]);
   const scrollRef = useRef<any>();
   const dispatch = useDispatch<AppDispatch>();
   const [message, setMessage] = useState<string>("");
   const [arrivalMessage, setArrivalMessage] = useState<any>(null);
   const [onlineUsers, setOnlineUsers] = useState<any>([]);
   const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
   const [emojiOn, setEmojiOn] = useState(false);
   const [image, setImage] = useState<any>(null);
   const [video, setVideo] = useState<any>(null);
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [progress, setProgress] = useState<number>(0);
   const [loading, setLoading] = useState<boolean>(false);
   const [typing, setTyping] = useState<boolean>(false);
   const [blocked, setBlocked] = useState<any>({ status: false });
   const [searchQuery] = useSearchParams();
   const [direct, setDirect] = useState(false);

   const handleVideoChange = (event: any) => {
      if (event.target.files && event.target.files.length > 0) {
         setSelectedFile(event.target.files[0]);
      }
   };

   const existing = searchQuery.get("userId");

   useEffect(() => {}, []);

   useEffect(() => {
      socket.on("image", (data: any) => {
         console.log(data);

         setArrivalMessage({
            createdAt: Date.now(),
            senderId: data?.senderId,
            image: data?.data,
         });
      });
      return () => {
         socket.off("image");
      };
   }, [socket]);

   const onEmojiClick = (event: any, emojiObject: any) => {
      let sym = event.unified.split("-");
      let codesArray: any = [];
      sym.forEach((el: any) => codesArray.push("0x" + el));
      let emoji = String.fromCodePoint(...codesArray);
      setMessage(message + emoji);
   };

   const handleImageChange = (event: any) => {
      const selectedFile = event.target.files[0];
      setImage(selectedFile);
   };

   useEffect(() => {
      socket.on("recieveMessage", (data: any) => {
         setArrivalMessage({
            message: data?.message,
            createdAt: Date.now(),
            senderId: data?.senderId,
         });
      });
      return () => {
         socket.off("recieveMessage");
      };
   }, [socket]);

   useEffect(() => {
      if (curChat?.members[0]?._id === arrivalMessage?.senderId || curChat?.members[1]?._id === arrivalMessage?.senderId) {
         setMessages((prev: any) => [...prev, arrivalMessage]);
      }
   }, [arrivalMessage]);

   useEffect(() => {
      handleFetchConversations();
   }, [userId]);

   useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   useEffect(() => {
      handlefetchOnline();
   }, []);

   const handlefetchOnline = async () => {
      try {
         const response = await fetchOnlineUsers();
         setOnlineUsers(response?.data?.data);
      } catch (error) {
         toast.error("Something went wrong");
      }
   };

   // const userId = searchQuery.get("conversa");

   // useEffect(() => {
   //    handleSelectConversation();
   // });

   const handleSelectConversation = (chat: any) => {
      setCurChat(chat);

      dispatch(fetchChats(chat?._id))
         .then((response) => {
            setMessages(response?.payload?.data);
         })
         .then(() => {
            const target = chat?.members?.filter((ob: any) => ob?._id != userId);
            console.log(target, "target");
            isUserBlocked(userId, target[0]?._id).then((result: any) => {
               if (result?.data?.data === "blockedByMe") {
                  setBlocked({ status: true, byHim: false });
               } else if (result?.data?.data === "blockedByHim") {
                  setBlocked({ status: true, byHim: true });
               } else {
                  setBlocked({ status: false });
               }
            });
         });
   };

   const handleSubmit = (event: any) => {
      event.preventDefault();
      setLoading(true);
      let receiverId: any;
      const form = new FormData();
      let type = "message";

      if (curChat?.members[0]._id === userId) {
         receiverId = curChat.members[1]._id;
      } else {
         receiverId = curChat.members[0]._id;
      }

      if (image) {
         const reader = new FileReader();
         reader.readAsDataURL(image);
         reader.onloadend = () => {
            console.log("reciever id", receiverId);

            const fileData = reader.result;
            socket.emit("image", { data: fileData, senderId: userId, receiverId });
         };
         form.append("image", image);
         type = "image";
         setImage(null);
      }

      if (selectedFile) {
         const chunkSize = 64 * 1024;
         const fileReader = new FileReader();
         let offset = 0;

         fileReader.addEventListener("error", (event) => {
            console.error("Error reading file:", event);
         });

         fileReader.addEventListener("load", (event) => {
            if (event.target?.readyState === FileReader.DONE) {
               const chunk = event.target.result as ArrayBuffer;
               socket.emit("video-chunk", { chunk, offset });
               offset += chunk.byteLength;
               setProgress((offset / selectedFile.size) * 100);
               sendNextChunk();
            }
         });

         const sendNextChunk = () => {
            if (offset < selectedFile.size) {
               const chunk = selectedFile.slice(offset, offset + chunkSize);
               fileReader.readAsArrayBuffer(chunk);
            } else {
               socket.emit("video-transfer-complete", {
                  senderId: userId,
                  receiverId,
                  conversationId: curChat?._id,
               });
               setProgress(100);
               setSelectedFile(null);
            }
         };

         sendNextChunk();

         return;
      }

      if (message) {
         console.log(receiverId, "reciever id");

         socket.emit("sendMessage", {
            senderId: userId,
            receiverId,
            message,
         });

         setMessage("");
      }

      form.append("message", message);
      form.append("senderId", userId || "");
      form.append("conversationId", curChat?._id);

      if (!form.get("message") && !form.get("image")) {
         setLoading(false);
         return;
      }
      dispatch(createMessage({ form, type })).then((response) => {
         if (response?.payload?.status === "ok") {
            fetchConversations(userId || "").then((response: any) => {
               setConversations(response?.data?.conversations);
            });
            dispatch(fetchChats(curChat?._id))
               .then((response: any) => {
                  setMessages(response?.payload?.data);
               })
               .catch(() => {
                  toast.error("Failed send");
               });
         }
      });
      setLoading(false);
   };

   const openModal = () => {
      setModalIsOpen(true);
   };

   const closeModal = () => {
      setModalIsOpen(false);
   };

   const handleFetchConversations = () => {
      fetchConversations(userId || "").then((response: any) => {
         setConversations(response?.data?.conversations);
      });
   };

   const [videoUrl, setVideoUrl] = useState<string | null>(null);
   const playerRef = useRef<ReactPlayer>(null);

   useEffect(() => {
      socket.on("video-upload-success", (data: any) => {
         const url = `http://localhost:7700/posts/${data?.fileName}`;
         setVideoUrl(url);
         setArrivalMessage({
            createdAt: Date.now(),
            senderId: data?.senderId,
            video: url,
         });
      });

      return () => {
         socket.off("video-upload-success");
      };
   }, [socket]);

   useEffect(() => {
      socket.on("upload-comepleted", (data: any) => {
         fetchConversations(userId || "").then((response: any) => {
            setConversations(response?.data?.conversations);
         });
         dispatch(fetchChats(data?.conversationId)).then((response: any) => {
            setMessages(response?.payload?.data);
            setLoading(false);
         });
      });
      setLoading(false);

      return () => {
         socket.off("upload-comepleted");
      };
   }, [socket]);

   useEffect(() => {
      socket.on("failed to upload", () => {
         toast("Failed to upload video");
      });
      setLoading(false);
      return () => {
         socket.off("failed to upload");
      };
   }, [socket]);

   useEffect(() => {
      if (videoUrl && playerRef.current) {
         playerRef.current.seekTo(0);
      }
   }, [videoUrl]);

   const handleTyping = () => {
      let receiverId: any;
      if (curChat?.members[0]._id === userId) {
         receiverId = curChat.members[1]._id;
      } else {
         receiverId = curChat.members[0]._id;
      }
      socket.emit("typing", {
         senderId: userId,
         receiverId,
         message,
      });
   };

   useEffect(() => {
      socket.on("typing", () => {
         setTyping(true);
         setTimeout(() => setTyping(false), 2000);
      });
   }, [socket]);

   const handleUnblockUser = async () => {
      try {
         const form = new FormData();
         form.append("userId", userId);
         const target = curChat?.members?.filter((ob: any) => ob?._id != userId);
         form.append("targetUserId", target[0]?._id);

         const response = await unblockOtherUser(form);
         dispatch(fetchChats(curChat?._id))
            .then((response) => {
               setMessages(response?.payload?.data);
            })
            .then(() => {
               const target = curChat?.members?.filter((ob: any) => ob?._id != userId);
               console.log(target, "target");
               isUserBlocked(userId, target[0]?._id).then((result) => {
                  if (result?.data?.data === "blocked") {
                     setBlocked(true);
                  } else {
                     setBlocked(false);
                  }
               });
            });
         toast.success(response?.data?.message);
      } catch (error) {
         toast.error("Something went wrong");
      }
   };

   return (
      <div className="flex flex-col bg-gray-100 min-h-screen items-center overflow-hidden">
         <div className="mt-5 w-full  h-[90vh] flex flex-col items-center overflow-hidden rounded-lg shadow-lg bg-white md:mx-auto">
            {!direct && (
               <div className="flex w-full h-14 mt-5 justify-between px-4  text-white">
                  <div className="flex items-center">
                     <h1 className="px-4 py-2 text-xl font-bold">New Message</h1>
                  </div>

                  <div className="flex items-center">
                     <button onClick={openModal} className="bg-indigo-700 px-4 py-2 rounded-md flex items-center">
                        <FontAwesomeIcon icon={faComment} className="mr-2" />
                        <span>New Message</span>
                     </button>

                     <NewMessage
                        modalIsOpen={modalIsOpen}
                        closeModal={closeModal}
                        handleFetchConversations={handleFetchConversations}
                        handleSelectConversation={handleSelectConversation}
                        conversations={conversations}
                        onlineUsers={onlineUsers}
                     />
                  </div>
               </div>
            )}
            <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
               {!direct ? (
                  <div className="bg-white w-full  lg:w-full flex flex-col md:rounded-l-lg md:border-r border-gray-300">
                     <Conversations
                        conversations={conversations}
                        handleSelectConversation={handleSelectConversation}
                        setDirect={setDirect}
                        userId={userId}
                        onlineUsers={onlineUsers}
                     />
                  </div>
               ) : (
                  <div className="flex mt-4 flex-col items-center flex-grow bg-white md:rounded-r-lg">
                     {curChat ? (
                        <div className="flex flex-col md:w-1/2 flex-grow">
                           <div style={{ height: "550px" }} className="bg-gray-100 p-4 flex flex-col flex-grow">
                              <div className="flex h-14 mb-5 p-2 items-center px-4 bg-gray-500 text-white rounded-t-lg">
                                 <button
                                    onClick={() => setDirect(false)}
                                    className="mr-4 flex items-center justify-center rounded-full bg-gray-300 p-2 hover:bg-gray-400 transition-colors"
                                 >
                                    <FontAwesomeIcon icon={faArrowLeft} className="text-gray-800" />
                                 </button>
                                 <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <img
                                       src={curChat?.members[1]?._id !== userId ? curChat?.members[1].profilePhoto : curChat?.members[0].profilePhoto}
                                       className="w-full h-full rounded-full object-cover"
                                       alt=""
                                    />
                                 </div>
                                 <div className="ml-3">
                                    <h1 className="text-lg font-semibold">
                                       {curChat?.members[1]?._id !== userId ? curChat?.members[1].fullName : curChat?.members[0].fullName}
                                    </h1>
                                    {typing && (
                                       <p className="text-sm">
                                          <span className="animate-pulse">Typing</span>
                                          <span className="animate-pulse animation-delay-200">.</span>
                                          <span className="animate-pulse animation-delay-400">.</span>
                                          <span className="animate-pulse animation-delay-600">.</span>
                                       </p>
                                    )}
                                 </div>
                              </div>

                              <div className="overflow-y-auto flex-grow p-4">
                                 {messages?.map((ob: any, i: number) => (
                                    <div key={i + "message"} ref={scrollRef}>
                                       <Chat message={ob} own={ob?.senderId === userId} playerRef={playerRef} />
                                    </div>
                                 ))}
                              </div>
                              {blocked?.status === true ? (
                                 <div className="bg-gray-100 p-4 rounded-md shadow-md">
                                    <div className="flex items-center justify-between mb-4">
                                       <h3 className="text-lg font-semibold text-gray-800">Blocked User</h3>
                                       {blocked?.byHim === false && (
                                          <button
                                             onClick={() => handleUnblockUser()}
                                             className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                                          >
                                             Unblock
                                          </button>
                                       )}
                                    </div>
                                    {blocked?.byHim === false ? (
                                       <p className="text-gray-600">
                                          You have blocked this user, so you can't send them messages or view their content.
                                       </p>
                                    ) : (
                                       <p> This user has blocked you. You won't be able to send them messages </p>
                                    )}
                                 </div>
                              ) : (
                                 <>
                                    <div className="absolute">{emojiOn && <EmojiPicker onEmojiClick={onEmojiClick} />}</div>
                                    <div className="flex items-center p-4">
                                       <input
                                          type="text"
                                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                          placeholder="Type your message here"
                                          value={message}
                                          onFocus={handleTyping}
                                          onChange={(e) => setMessage(e.target.value)}
                                       />

                                       <button onClick={() => setEmojiOn(!emojiOn)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md ml-2">
                                          😊
                                       </button>
                                       <div className="flex items-center bg-gray-200 ml-2 h-10 rounded-md">
                                          <label htmlFor="image-upload" className="cursor-pointer flex px-4 items-center">
                                             <FontAwesomeIcon icon={faFileImage} className="h-6 w-6 text-gray-800" />
                                          </label>
                                          <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                       </div>
                                       <div className="flex items-center bg-gray-200 ml-2 w-20 h-10 rounded-md">
                                          <label htmlFor="video-upload" className="cursor-pointer mb-4 flex items-center">
                                             <FontAwesomeIcon icon={faVideo} className="text-gray-800 size-8 mt-4 ml-2 mr-2" />
                                          </label>
                                          <input id="video-upload" type="file" accept="video/*" onChange={handleVideoChange} className="hidden" />
                                       </div>
                                       {loading ? (
                                          <div className="pl-3">
                                             <LoadingButton />
                                          </div>
                                       ) : (
                                          <button onClick={handleSubmit} className="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2">
                                             Send
                                          </button>
                                       )}
                                    </div>
                                 </>
                              )}
                           </div>
                        </div>
                     ) : (
                        <>
                           <span className="text-5xl text-gray-400 cursor-default m-auto">Open a conversation to start a chat.</span>
                        </>
                     )}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default MessageBox;
