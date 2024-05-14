import { useDispatch, useSelector } from "react-redux";
import ConnectButton from "../connectButton/ConnectButton";
import { AppDispatch, RootState } from "../../store/store";
import { FC, useEffect } from "react";
import { fetchAllUsers } from "../../store/actions/auth/userActions";
import { fetchAllNetworks } from "../../store/actions/network/networkActions";
import { useNavigate } from "react-router-dom";

const Users: FC = () => {
   const users: any = useSelector((state: RootState) => state?.user?.allUsers?.data);
   const networks: any = useSelector((state: RootState) => state?.networks?.network?.data);
   const userId = useSelector((state: RootState) => state?.user?.user?.userId);
   const dispatch = useDispatch<AppDispatch>();

   const navigate = useNavigate();

   useEffect(() => {
      dispatch(fetchAllUsers());
      dispatch(fetchAllNetworks());
   }, []);

   const isFollowing = (id: any) => {
      return networks?.some((ob: any) => {
         return id == ob?.targetUserId && ob?.sourceUserId === userId;
      });
   };

   const handleClick = (id: number, email: string) => {
      navigate(`/others-profile?userId=${id}&email=${email}`);
   };

   return (
      <div className="flex flex-wrap justify-center overflow-y-auto">
         {users?.map((user: any) => (
            <div key={user?._id}>
               {user?.role !== "admin" && (
                  <div className="user-card bg-white rounded-lg shadow-md p-6 m-4 w-72 hover:shadow-lg transition-shadow duration-300">
                     <div className="flex items-center mb-4">
                        <div className="profile-photo mr-4 hover:cursor-pointer" onClick={() => handleClick(user?._id, user?.email)}>
                           <img src={user?.profilePhoto} alt="Profile" className="min-w-20 max-w-20 h-20 rounded-full object-cover" />
                        </div>
                        <div className="user-name text-lg font-semibold hover:cursor-pointer">
                           <div onClick={() => handleClick(user?._id, user?.email)}>{user?.fullName}</div>
                           <div className="mt-2">
                              {isFollowing(user?._id) ? (
                                 <button className="px-4 py-2 w-28 rounded-md text-white bg-indigo-500 hover:bg-purple-700 focus:outline-none transition-colors duration-300">
                                    Message
                                 </button>
                              ) : (
                                 <ConnectButton id={user?._id} content="Follow" />
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         ))}
      </div>
   );
};

export default Users;
