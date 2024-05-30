import { FC, useEffect, useRef, useState } from "react";
import Menu from "../../components/menu/Menu";
import MessageBox from "../../components/message/MessageBox";
import Header from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import socketService from "../../service/socketService";
import { fetchConversations, fetchOnlineUsers } from "../../service/api";
import toast from "react-hot-toast";
import { fetchChats } from "../../store/actions/message/messageActions";
import ReactPlayer from "react-player";
const socket = socketService.socket;

const Messages: FC = () => {
   const userId: any = useSelector((state: RootState) => state?.user?.user?.userId);
   const [curChat] = useState<any>(null);
   const [______, setConversations] = useState<any>([]);
   const [messages, setMessages] = useState<any>([]);
   const scrollRef = useRef<any>();
   const dispatch = useDispatch<AppDispatch>();
   // const [message, setMessage] = useState<string>("");
   const [arrivalMessage, setArrivalMessage] = useState<any>(null);
   const [___, setOnlineUsers] = useState<any>([]);

   const [__, setLoading] = useState<boolean>(false);
   const [typing, setTyping] = useState<boolean>(false);
   // const [blocked, setBlocked] = useState<any>({ status: false });
   // const [searchQuery] = useSearchParams();

   console.log(typing);

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

   // const handleSelectConversation = (chat: any) => {
   //    setCurChat(chat);

   //    dispatch(fetchChats(chat?._id))
   //       .then((response) => {
   //          setMessages(response?.payload?.data);
   //       })
   //       .then(() => {
   //          const target = chat?.members?.filter((ob: any) => ob?._id != userId);
   //          console.log(target, "target");
   //          isUserBlocked(userId, target[0]?._id).then((result: any) => {
   //             if (result?.data?.data === "blockedByMe") {
   //                setBlocked({ status: true, byHim: false });
   //             } else if (result?.data?.data === "blockedByHim") {
   //                setBlocked({ status: true, byHim: true });
   //             } else {
   //                setBlocked({ status: false });
   //             }
   //          });
   //       });
   // };

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

   // const handleTyping = () => {
   //    let receiverId: any;
   //    if (curChat?.members[0]._id === userId) {
   //       receiverId = curChat.members[1]._id;
   //    } else {
   //       receiverId = curChat.members[0]._id;
   //    }
   //    socket.emit("typing", {
   //       senderId: userId,
   //       receiverId,
   //       message,
   //    });
   // };

   useEffect(() => {
      socket.on("typing", () => {
         setTyping(true);
         setTimeout(() => setTyping(false), 2000);
      });
   }, [socket]);

   return (
      <>
         <Header />
         <Menu />
         <MessageBox />
         {/* <Conversations conversations={conversations} handleSelectConversation={handleSelectConversation} /> */}
         {/* <MessageBox
               message={message}
               setMessages={setMessages}
               curChat={curChat}
               setMessage={setMessage}
               setConversations={setConversations}
               messages={messages}
               scrollRef={scrollRef}
               playerRef={playerRef}
               handleTyping={handleTyping}
            /> */}

         <div className="hidden lg:block">{/* <RightSideBar /> */}</div>
      </>
   );
};

export default Messages;
