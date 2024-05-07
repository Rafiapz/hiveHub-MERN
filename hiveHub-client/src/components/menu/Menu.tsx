import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faHome,
   faBell,
   faEnvelope,
   faBookmark,
   faUsers,
   faUser,
   faPlus,
   faChartLine,
   faFileAlt,
   faNewspaper,
   faCommentDots,
   faUserCircle,
   faPlusCircle,
   faTimes,
   faBars,
   faBellSlash,
   faBlog,
   faClipboardList,
   faChartPie,
   faCrown,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { handleCreatePostModal } from "../../store/slices/posts/postSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { RootState } from "../../store/store";

function Menu() {
   const role = useSelector((state: RootState) => state.user.user.auth.role);
   const dispatch = useDispatch();

   const [showSidebar, setShowSidebar] = useState(true);

   const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
   };

   return (
      <>
         {role === "admin" ? (
            <>{/* Admin section (no changes) */}</>
         ) : (
            <>
               <div className="sm:hidden fixed top-4 right-4 z-10">
                  <button
                     onClick={toggleSidebar}
                     className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-colors duration-300"
                  >
                     {showSidebar ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
                  </button>
               </div>
               <div
                  className={`bg-white h-full w-72 fixed flex flex-col justify-between shadow-lg transition-all duration-300 ${
                     showSidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
                  }`}
               >
                  <div className="p-4 flex flex-col space-y-4">
                     <Link to="/" className="flex items-center text-gray-700 hover:text-indigo-500 p-2 rounded-md transition-colors duration-300">
                        <FontAwesomeIcon icon={faHome} className="mr-2 text-indigo-500" />
                        Home
                     </Link>
                     <div className="flex">
                        <Link
                           to="/notifications"
                           className="flex items-center text-gray-700 hover:text-indigo-500 p-2 rounded-md transition-colors duration-300"
                        >
                           <FontAwesomeIcon icon={faBell} className="mr-2 text-indigo-500" />
                           Notifications
                        </Link>
                     </div>
                     <Link
                        to={"/messages"}
                        className="flex items-center text-gray-700 hover:text-indigo-500 p-2 rounded-md transition-colors duration-300"
                     >
                        <FontAwesomeIcon icon={faCommentDots} className="mr-2 text-indigo-500" />
                        Messages
                     </Link>
                     <a href="#" className="flex items-center text-gray-700 hover:text-indigo-500 p-2 rounded-md transition-colors duration-300">
                        <FontAwesomeIcon icon={faBookmark} className="mr-2 text-indigo-500" />
                        Bookmarks
                     </a>
                     <Link
                        to="/profile"
                        className="flex items-center text-gray-700 hover:text-indigo-500 p-2 rounded-md transition-colors duration-300"
                     >
                        <FontAwesomeIcon icon={faUserCircle} className="mr-2 text-indigo-500" />
                        My Profile
                     </Link>
                     <Link
                        to={"/premium"}
                        className="flex items-center text-gray-700 hover:text-indigo-500 p-2 rounded-md transition-colors duration-300"
                     >
                        <FontAwesomeIcon icon={faCrown} className="mr-2 text-indigo-500" />
                        Premium
                     </Link>
                  </div>
                  <div className="p-4">
                     <button
                        onClick={() => dispatch(handleCreatePostModal())}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 w-full rounded flex items-center justify-center transition-colors duration-300"
                     >
                        <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                        New Post
                     </button>
                  </div>
               </div>
            </>
         )}
      </>
   );
}

export default Menu;
