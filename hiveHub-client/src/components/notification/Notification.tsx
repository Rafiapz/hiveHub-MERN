import React, { FC, useEffect, useState } from "react";
import { deleteNotification, fetchNotifications } from "../../service/api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { format } from "timeago.js";
import ConnectButton from "../connectButton/ConnectButton";
import { fetchAllNetworks, fetchFollwing } from "../../store/actions/network/networkActions";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../loading/Loading";

const Notification: React.FC<any> = () => {
   const [notifications, setNotifications] = useState<any>([]);
   const userId = useSelector((state: RootState) => state?.user?.user?.userId);
   const networks: any = useSelector((state: RootState) => state?.networks?.network?.data);
   const [hasMore, setHasMore] = useState<boolean>(true);
   const [page, setPage] = useState<number>(1);

   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      dispatch(fetchAllNetworks());
   }, []);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      try {
         const response = await fetchNotifications(userId, page);
         setNotifications(response.data.data);
      } catch (error) {
         toast.error("failed to load notifications");
      }
   };

   const fetchMore = async () => {
      try {
         setPage(page + 1);
         const response = await fetchNotifications(userId, page);

         if (response?.data?.data?.length <= 0) {
            setHasMore(false);
         }

         setNotifications((prev: any) => [...prev, ...response?.data?.data]);
      } catch (error) {
         toast.error("failed to load notifications");
      }
   };

   const handleDelete = async (id: any) => {
      try {
         const response = await deleteNotification(id);
         await fetchData();
         console.log(notifications);

         toast.success("Successfully deleted");
      } catch (error) {
         toast.error("Failed to delete");
      }
   };

   const isFollowing = (id: any) => {
      return networks?.some((ob: any) => {
         return id == ob?.targetUserId && ob?.sourceUserId === userId;
      });
   };

   return (
      <div style={{ width: "880px" }} className="flex flex-wrap  justify-center">
         {notifications?.map((notification: any, i: number) => (
            <div
               key={i + "sd"}
               className={`user-card rounded-lg w-full shadow-md p-3 m-1 hover:shadow-lg transition-shadow duration-300 relative${
                  notification.seen === "true" ? " bg-white" : " bg-white"
               }`}
            >
               <div className="flex items-center mb-2">
                  <div className="profile-photo mr-4 hover:cursor-pointer">
                     <img src={notification?.actionBy?.profilePhoto} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
                  </div>
                  <div className="flex">
                     <div className="user-name hover:cursor-pointer">
                        <h1 className="text-lg font-semibold text-purple-600">{notification?.actionBy?.fullName}</h1>
                        <p className="text-gray-600">{notification?.message}</p>
                     </div>
                     {notification?.type === "started_following" && !isFollowing(notification?.actionBy?._id) && (
                        <div className="mt-3 ml-20">
                           <ConnectButton id={notification?.actionBy?._id} content={"Follow back"} />
                        </div>
                     )}
                  </div>

                  <div className="absolute top-2 right-2 flex items-center">
                     <div className="text-gray-500 mr-2">{format(notification?.createdAt)}</div>
                     <div className="text-gray-500 hover:text-red-500 cursor-pointer" onClick={() => handleDelete(notification?._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                           />
                        </svg>
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default Notification;
