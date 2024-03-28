import { useDispatch, useSelector } from "react-redux";
import ConnectButton from "../connectButton/ConnectButton";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchAllUsers } from "../../store/actions/auth/userActions";

function Users() {
   const users: any = useSelector((state: RootState) => state?.user?.allUsers?.data);

   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      dispatch(fetchAllUsers());
   }, []);

   return (
      <div className="flex flex-wrap justify-center  overflow-y-auto">
         {users?.map((user: any) => (
            <div key={user?._id} className="user-card bg-white rounded-lg w-72 shadow-lg p-4 m-4">
               <div className="flex items-center mb-2">
                  <div className="profile-photo mr-4">
                     <img src={user?.profilePhoto} alt="Profile" className="w-20 h-20 rounded-full" />
                  </div>
                  <div className="user-name text-lg font-semibold">
                     {user?.fullName}
                     <div key={user?.id + "button"}>
                        <ConnectButton id={user?._id} />
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}

export default Users;
