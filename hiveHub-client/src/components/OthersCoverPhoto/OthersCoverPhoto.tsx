import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchOtherUser } from "../../store/actions/auth/userActions";

const OthersCoverPhoto: FC = () => {
   const [userData, setUserData] = useState<any>({});

   const [searchQuery, setSearchQuery] = useSearchParams();
   const dispatch = useDispatch<AppDispatch>();

   const email = searchQuery.get("email");

   useEffect(() => {
      if (email) {
         dispatch(fetchOtherUser(email)).then((reponse:any)=>{
            setUserData(reponse?.payload?.data)
         })
      }
   });

   return (
      <div className="flex justify-center w-full h-64 ">
         <div style={{ width: "800px" }} className="user-profile mt-1 bg-white rounded-lg shadow-lg h-full relative">
            <div className="cover-photo mb-4 w-full h-full relative">
               <img src={userData?.coverPhoto} alt="Cover" className="rounded-lg w-full h-full object-cover" />
            </div>
            <div className="flex justify-between profile-info ">
               <h1 className="text-xl ml-36 font-bold">{userData?.fullName}</h1>
               {/* <div className="profile-actions ">
                 
                  <button className="share-button bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded">Share</button>
               </div> */}
            </div>
            <div className="profile-photo absolute top-48 left-8 ml-4 mb-8">
               <img src={userData?.profilePhoto} alt="Profile" className="rounded-full w-24 h-24" />
            </div>
         </div>
      </div>
   );
};

export default OthersCoverPhoto;
