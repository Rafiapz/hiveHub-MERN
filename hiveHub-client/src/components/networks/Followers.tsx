import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchFollowers } from "../../store/actions/network/networkActions";
import { useNavigate } from "react-router-dom";

const Followers: FC = () => {
   const followers: any = useSelector((state: RootState) => state?.networks?.followers?.data);
   const navigate = useNavigate();

   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      dispatch(fetchFollowers());
   }, []);

   const handleClick = (id: number, email: string) => {
      navigate(`/others-profile?userId=${id}&email=${email}`);
   };

   return (
      <div className="flex flex-col  ml-96  overflow-y-auto">
         {followers?.map((item: any) => (
            <div key={item?._id} className="user-card bg-white rounded-lg w-72 shadow-lg p-4 m-4">
               <div className="flex items-center mb-2">
                  <div className="profile-photo mr-4">
                     <img src={item?.sourceUserId?.profilePhoto} alt="Profile" className="w-20 h-20 object-cover rounded-full" />
                  </div>
                  <div className="user-name text-lg font-semibold">
                     {item?.sourceUserId?.fullName}
                     <div>
                        <button
                           onClick={() => handleClick(item?.targetUserId?._id, item?.targetUserId?.email)}
                           className="px-3 py-1 rounded-md text-black font-bold border border-black bg-white hover:bg-gray-200 focus:outline-none transition-colors duration-300"
                        >
                           View
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default Followers;
