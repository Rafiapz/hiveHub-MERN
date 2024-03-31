import Searchbox from "../search/Searchbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { logoutAction } from "../../store/actions/auth/userActions";
import { AppDispatch } from "../../store/store";
import Users from "../users/Users";
import { FC } from "react";

const RightSideBar: FC = () => {
   const dispatch = useDispatch<AppDispatch>();

   const { pathname } = useLocation();
   const handleLogout = () => {
      dispatch(logoutAction());
   };
   return (
      <div className="bg-gray-50 h-full w-80 fixed top-0 right-0 flex flex-col  shadow-lg">
         <div className="p-4">
            <Searchbox />
         </div>
         <Users />
         {pathname === "/edit-profile" && (
            <div className="flex justify-end pr-4 pb-4">
               <button onClick={() => handleLogout()} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
               </button>
            </div>
         )}
      </div>
   );
};

export default RightSideBar;
