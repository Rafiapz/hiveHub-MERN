import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Peer from "simple-peer";
import { RootState } from "../../store/store";

const VideoCall: FC<any> = ({ socket }: any) => {
   // const userId = useSelector((state: RootState) => state?.user?.user?.userId);
   // const [stream, setStream] = useState();
   // const videoRef = useRef<HTMLVideoElement | null>(null);
   // const myVideo = useRef<HTMLVideoElement | null>(null);
   // const userVideo = useRef<HTMLVideoElement | null>(null);
   // const connectionRef = useRef<any>(null);
   // const [me, setMe] = useState<string>("");
   // const [call, setCall] = useState<any>({});
   // const [callAccepted, setCallAccepted] = useState<boolean>(false);
   // const [name, setName] = useState<string>("");

   // useEffect(() => {
   //    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream: any) => {
   //       setStream(currentStream);
   //       if (myVideo.current) {
   //          myVideo.current.srcObject = currentStream;
   //       }
   //       socket.on("me", (id: string) => setMe(id));
   //       socket.on("callUser", ({ from, name: callerName, signal }: any) => {
   //          setCall({ isReceived: false, from, name: callerName, signal });
   //       });
   //    });
   // }, []);

   // const callUser = (id: any) => {
   //    const peer = new Peer({ initiator: true, trickle: false, stream });

   //    peer.on("signal", (data) => {
   //       console.log("caling");

   //       socket.emit("callUser", { userToCall: id, signalData: data, from: me, name });
   //    });

   //    peer.on("stream", (currentStream) => {
   //       if (userVideo.current) {
   //          userVideo.current.srcObject = currentStream;
   //       }
   //    });

   //    socket.on("callAccepted", (signal: any) => {
   //       setCallAccepted(true);

   //       peer.signal(signal);
   //    });

   //    connectionRef.current = peer;
   // };

   // const answerCall = () => {
   //    setCallAccepted(true);

   //    const peer = new Peer({ initiator: false, trickle: false, stream });

   //    peer.on("signal", (data) => {
   //       socket.emmit("answerCall", { signal: data, to: call.from });
   //    });

   //    peer.on("stream", (currentStream) => {
   //       if (userVideo.current) {
   //          userVideo.current.srcObject = currentStream;
   //       }
   //    });

   //    peer.signal(call.signal);

   //    connectionRef.current = peer;
   // };

   // const leaveCall = () => {};
   // return (
   //    <div>
   //       <div>{stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}</div>
   //       <div>
   //          <video playsInline ref={videoRef} autoPlay style={{ width: "300px" }} /> :
   //       </div>
   //       <div>
   //          <button onClick={() => callUser("6602b9afe13b257506a13e5c")}>call user</button>
   //       </div>
   //    </div>
   // );

   return <></>;
};

export default VideoCall;
