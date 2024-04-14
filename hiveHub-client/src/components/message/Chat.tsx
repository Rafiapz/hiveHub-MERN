import { FC } from "react";
import { connect } from "socket.io-client";
import { format } from "timeago.js";
const socket = connect("http://localhost:7700");

const Chat: FC<any> = ({ message, own }) => {
   return (
      <div>
         <div className={`flex ${own ? "flex-row-reverse" : "flex-row"}`}>
            <div className="mt-2 p-2 bg-green-200 rounded-md h-10 w-52">{message?.message}</div>
         </div>
         <div className={`flex ${own ? "justify-end" : ""}`}>
            <div className="text-xs text-gray-500 mt-1">{format(message.createdAt)}</div>
         </div>
      </div>
   );
};

export default Chat;
