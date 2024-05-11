import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { FC, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { fetchuser } from "../../store/actions/auth/userActions";

const CoverPhoto: FC = () => {
   const userData: any = useSelector((state: RootState) => state?.user?.user?.data);

   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      dispatch(fetchuser());
   }, []);

   const navigate = useNavigate();

   const handleEditProfile = () => {
      navigate("/edit-profile");
   };

   return (
      <div className="flex justify-center w-full h-64 ">
         <div style={{ width: "800px" }} className="user-profile mt-1 bg-white rounded-lg shadow-lg h-full relative">
            <div className="cover-photo mb-4 w-full h-full relative">
               <img src={userData?.coverPhoto} alt="Cover" className="rounded-lg w-full h-full object-cover" />
            </div>
            <div className="flex justify-between profile-info ">
               <div className="flex">
                  {userData?.premium && (
                     <svg
                        className="fill-current ml-40 mt-1 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="16"
                        height="16"
                     >
                        <circle cx="8" cy="8" r="8" fill="" />
                        <path d="M5.17 8.5L2.14 5.5L3.5 4.17L8.83 9.5L13.17 5.5z" fill="white" />
                     </svg>
                  )}
                  <h1 className={userData?.premium ? "text-xl ml-4 font-bold" : "text-xl ml-40 font-bold"}>{userData?.fullName}</h1>
               </div>
               <div className="profile-actions flex items-center space-x-2">
                  <button
                     onClick={handleEditProfile}
                     className="edit-profile-button   text-black font-semibold border border-blue-700 py-2 px-4 rounded-3xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-pink-100"
                  >
                     Edit Profile
                  </button>
                  <button className="share-button border border-blue-700 rounded-3xl text-black font-semibold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-blue-200">
                     <FontAwesomeIcon icon={faShare} /> Share
                  </button>
               </div>
            </div>
            <div className="profile-photo absolute top-48 left-8 ml-4 mb-8">
               <img src={userData?.profilePhoto} alt="Profile" className="rounded-full w-28 h-28 object-cover" />
            </div>
         </div>
      </div>
   );
};

export default CoverPhoto;
