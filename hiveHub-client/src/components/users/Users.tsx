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
      <div className="flex flex-wrap justify-center  overflow-y-auto">
         {users?.map((user: any) => (
            <div key={user?._id} className="user-card bg-white rounded-lg w-72 shadow-lg p-4 m-4">
               <div className="flex items-center mb-2">
                  <div className="profile-photo mr-4 hover:cursor-pointer">
                     <img
                        src={user?.profilePhoto}
                        alt="Profile"
                        className="w-20 h-16 rounded-full"
                        onClick={() => handleClick(user?._id, user?.email)}
                     />
                  </div>
                  <div className="user-name text-lg font-semibold hover:cursor-pointer">
                     <div onClick={() => handleClick(user?._id, user?.email)}>{user?.fullName}</div>

                     <div>
                        {isFollowing(user?._id) ? (
                           <button className="px-2 py-1 rounded-md text-blue-300 bg-white hover:bg-blue-700 focus:outline-none border border-blue-700">
                              message
                           </button>
                        ) : (
                           <ConnectButton id={user?._id} />
                        )}
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default Users;
