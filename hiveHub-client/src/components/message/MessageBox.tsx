import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faFileImage, faFileVideo, faVideo } from "@fortawesome/free-solid-svg-icons";
import Chat from "./Chat";
import { createConversation, createMessage, fetchChats } from "../../store/actions/message/messageActions";
import { fetchConversations, sendVideo } from "../../service/api";
import { connect, io } from "socket.io-client";
import NewMessage from "../newMessage/NewMessage";
import VideoCall from "../videoCall/VideoCall";
import EmojiPicker from "emoji-picker-react";
import ReactPlayer from "react-player";
import LoadingButton from "../loading/LoadingButton";
import toast from "react-hot-toast";
import AudioRecorderComponent from "../audioRecorder/AudioRecorder";

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
   const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
   const [emojiOn, setEmojiOn] = useState(false);
   const [image, setImage] = useState<any>(null);
   const [video, setVideo] = useState<any>(null);
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [progress, setProgress] = useState<number>(0);
   const [loading, setLoading] = useState<boolean>(false);

   const handleVideoChange = (event: any) => {
      if (event.target.files && event.target.files.length > 0) {
         setSelectedFile(event.target.files[0]);
      }
   };

   useEffect(() => {
      socket.on("image", (data) => {
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
   };

   const handleSubmit = (event: any) => {
      event.preventDefault();
      setLoading(true);
      let receiverId: any;
      const form = new FormData();
      let type = "message";

      if (image) {
         const reader = new FileReader();
         reader.readAsDataURL(image);
         reader.onloadend = () => {
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
               .catch((err) => {
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
      socket.on("upload-comepleted", (data) => {
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
               <button onClick={openModal} className="bg-blue-700 text-white px-4 py-2 rounded">
                  <FontAwesomeIcon icon={faComment} className="mr-2" />
                  new Message
               </button>

               <NewMessage
                  modalIsOpen={modalIsOpen}
                  closeModal={closeModal}
                  handleFetchConversations={handleFetchConversations}
                  handleSelectConversation={handleSelectConversation}
                  conversations={conversations}
               />
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
                              <Chat message={ob} own={ob?.senderId === userId} playerRef={playerRef} />
                           </div>
                        ))}
                     </div>
                     <div className="absolute">{emojiOn && <EmojiPicker onEmojiClick={onEmojiClick} />}</div>

                     <div className="flex items-center mt-4">
                        <input
                           type="text"
                           className="w-full p-2 border border-black rounded-md focus:outline-none"
                           placeholder="Type your message here"
                           value={message}
                           onChange={(e) => setMessage(e.target.value)}
                        />
                        <AudioRecorderComponent />

                        <button onClick={() => setEmojiOn(!emojiOn)} className="bg-gray-400 text-white px-4 py-2 rounded-md ml-2">
                           😊
                        </button>
                        <div className="flex items-center bg-gray-400 ml-2 h-10 rounded-md ">
                           <label htmlFor="image-upload" className="cursor-pointer flex px-4  items-center">
                              <FontAwesomeIcon icon={faFileImage} className="h-6  w-6 mr-2" />
                           </label>
                           <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </div>
                        <div className="flex i  tems-center bg-gray-400 ml-2 w-20 h-10 rounded-md ">
                           <label htmlFor="video-upload" className="cursor-pointer mb-4 flex items-center">
                              <FontAwesomeIcon icon={faVideo} className="text-black size-8 mt-4 ml-2 mr-2" />
                           </label>
                           <input id="video-upload" type="file" accept="video/*" onChange={handleVideoChange} className="hidden" />
                        </div>
                        {loading ? (
                           <div className="pl-3">
                              <LoadingButton />
                           </div>
                        ) : (
                           <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
                              Send
                           </button>
                        )}
                     </div>
                  </div>
               </div>
            ) : (
               <>
                  <span className=" text-5xl text-gray-300 cursor-default ">Open a conversation to start a chat.</span>
               </>
            )}
         </div>
      </div>
   );
};

export default MessageBox;
