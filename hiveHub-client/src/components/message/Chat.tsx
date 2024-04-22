import { FC } from "react";
import ReactPlayer from "react-player";
import { format } from "timeago.js";

const Chat: FC<any> = ({ message, own, playerRef, videoUrl }) => {
   return (
      <div>
         {!message?.image ? (
            <div className={`flex ${own ? "flex-row-reverse" : "flex-row"}`}>
               <div className="mt-2 p-2 bg-green-200 rounded-md h-10 w-52">{message?.message}</div>
            </div>
         ) : (
            <>
               {message?.message ? (
                  <div className={`flex ${own ? "flex-row-reverse" : "flex-row"}`}>
                     <img src={message?.image} className={` max-h-32`} alt="" />
                  </div>
               ) : (
                  <>
                     {videoUrl && (
                        <div className="max-h-32">
                           <ReactPlayer ref={playerRef} url={message?.video} controls playing width="100%" height="auto" />
                        </div>
                     )}
                  </>
               )}
            </>
         )}

         <div className={`flex ${own ? "justify-end" : ""}`}>
            <div className="text-xs text-gray-500 mt-1">{format(message?.createdAt)}</div>
         </div>
      </div>
   );
};

export default Chat;
