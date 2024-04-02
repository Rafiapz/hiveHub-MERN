import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchFollowers } from "../../store/actions/network/networkActions";

const Followers: FC = () => {
   const followers: any = useSelector((state: RootState) => state?.networks?.followers?.data);

   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      dispatch(fetchFollowers());
   }, []);

   return (
      <div className="flex flex-col  ml-96  overflow-y-auto">
         {followers?.map((item: any) => (
            <div key={item?._id} className="user-card bg-white rounded-lg w-72 shadow-lg p-4 m-4">
               <div className="flex items-center mb-2">
                  <div className="profile-photo mr-4">
                     <img src={item?.sourceUserId?.profilePhoto} alt="Profile" className="w-24 h-20 rounded-full" />
                  </div>
                  <div className="user-name text-lg font-semibold">
                     {item?.sourceUserId?.fullName}
                     <div>
                        <button className="px-2 py-1 rounded-md text-blue-300 bg-white hover:bg-blue-700 focus:outline-none border border-blue-700">
                           message
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
