import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchFollwing, unFollow } from "../../store/actions/network/networkActions";
import { handleUnfollowModal } from "../../store/slices/network/networkSlice";
import { useNavigate } from "react-router-dom";

const Following: FC = () => {
   const following: any = useSelector((state: RootState) => state?.networks?.following?.data);
   const [options, setOptions] = useState<{ index: number; status: boolean }>({ index: 0, status: false });

   const navigate = useNavigate();

   useEffect(() => {
      dispatch(fetchFollwing());
   }, []);

   const dispatch = useDispatch<AppDispatch>();

   const handleOptionsClick = (index: number) => {
      setOptions((prev) => {
         if (index == prev.index) {
            return {
               index: index,
               status: !prev.status,
            };
         } else {
            return {
               index: index,
               status: true,
            };
         }
      });
   };

   const handleUnfollow = (index: number, id: number) => {
      handleOptionsClick(index);
      dispatch(handleUnfollowModal({ status: true, curId: id }));
   };

   const handleClick = (id: number, email: string) => {
      navigate(`/others-profile?userId=${id}&email=${email}`);
   };

   return (
      <div className="flex flex-col ml-96 relative overflow-y-auto">
         {following?.map((item: any, i: number) => (
            <div key={item?._id} className="user-card bg-white rounded-lg w-80 shadow-lg p-4 m-4 relative">
               <div className="flex items-center mb-2">
                  <div className="profile-photo mr-4">
                     <img
                        src={item?.targetUserId?.profilePhoto}
                        onClick={() => handleClick(item?.targetUserId?._id, item?.targetUserId?.email)}
                        alt="Profile"
                        className="w-20 h-20 object-cover rounded-full"
                     />
                  </div>
                  <div className="user-name text-lg font-semibold">
                     {item?.targetUserId?.fullName}
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
               <div className="absolute top-0 right-0  ">
                  <div
                     className=" absolute hover:cursor-pointer  hover:bg-gray-500 top-0 right-0 mt-2 mr-2 flex flex-col"
                     onClick={() => handleOptionsClick(i)}
                  >
                     <div className="dot h-2 w-2 bg-blue-300 rounded-full mb-1"></div>
                     <div className="dot h-2 w-2 bg-blue-300 rounded-full mb-1"></div>
                     <div className="dot h-2 w-2 bg-blue-300 rounded-full"></div>
                  </div>
                  {options.index === i && options.status && (
                     <div className="absolute top-1  right-1 w-28 h-22 bg-white mt-2 mr-4 border border-red-300 shadow-lg rounded-md">
                        <ul>
                           <li onClick={() => handleUnfollow(i, item?._id)} className="p-1 hover:bg-red-200">
                              <button>Unfollow</button>
                           </li>
                        </ul>
                     </div>
                  )}
               </div>
            </div>
         ))}
      </div>
   );
};

export default Following;
