import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchOtherUser } from "../../store/actions/auth/userActions";
import ConnectButton from "../connectButton/ConnectButton";
import { handleUnfollowModal } from "../../store/slices/network/networkSlice";

const OthersCoverPhoto: FC = () => {
   const [userData, setUserData] = useState<any>({});
   const [searchQuery, setSearchQuery] = useSearchParams();
   const networks: any = useSelector((state: RootState) => state?.networks?.network?.data);
   const dispatch = useDispatch<AppDispatch>();
   const userId = useSelector((state: RootState) => state.user.user.userId);

   const email = searchQuery.get("email");

   useEffect(() => {
      if (email) {
         dispatch(fetchOtherUser(email)).then((reponse: any) => {
            setUserData(reponse?.payload?.data);
         });
      }
   }, [email]);

   const isFollowing = (id: any) => {
      return networks?.some((ob: any) => {
         return id == ob?.targetUserId && ob?.sourceUserId === userId;
      });
   };

   const handleUnfollow = (id: any) => {
      const data = networks?.filter((ob: any) => ob?.targetUserId === id);
      dispatch(handleUnfollowModal({ status: true, curId: data[0]?._id }));
   };

   return (
      <div className="flex justify-center w-full h-64">
         <div style={{ width: "800px" }} className="user-profile mt-1 bg-white rounded-lg shadow-lg h-full relative">
            <div className="cover-photo mb-4 w-full h-full relative">
               <img src={userData?.coverPhoto} alt="Cover" className="rounded-lg w-full h-full object-cover" />
            </div>
            <div className="profile-info px-4 py-2">
               <h1 className="text-xl font-bold ml-36">{userData?.fullName}</h1>
               <div className="flex justify-end">
                  {isFollowing(userData?._id) ? (
                     <button
                        onClick={() => handleUnfollow(userData?._id)}
                        className="bg-white hover:bg-white text-blue-400 border border-black font-bold py-2 px-4 rounded"
                     >
                        Unfollow
                     </button>
                  ) : (
                     <ConnectButton id={userData?._id} content={"Follow"} />
                  )}
               </div>
            </div>
            <div className="profile-photo absolute top-48 left-8 ml-4 mb-8">
               <img src={userData?.profilePhoto} alt="Profile" className="rounded-full w-28 h-28 object-cover" />
            </div>
         </div>
      </div>
   );
};

export default OthersCoverPhoto;
