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
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { fetchuser } from "../../store/actions/auth/userActions";

function Menu() {
   const role = useSelector((state: RootState) => state.user.user.auth.role);

   const dispatch = useDispatch<AppDispatch>();

   const [showSidebar, setShowSidebar] = useState(false);

   useEffect(() => {
      dispatch(fetchuser());
   }, [role]);

   const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
   };

   return (
      <>
         {role === "admin" ? (
            <>
               {/* Mobile sidebar button */}
               <div className="fixed bottom-4 right-4  sm:hidden">
                  <button
                     onClick={toggleSidebar}
                     className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors duration-300"
                  >
                     {showSidebar ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
                  </button>
               </div>

               {/* Sidebar */}
               <div
                  className={`bg-white h-screen w-72 fixed top-0 left-0 flex flex-col justify-between shadow-lg transition-all duration-300 lg:translate-x-0 ${
                     showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                  }`}
               >
                  <div className="p-4 flex flex-col space-y-4">
                     <Link
                        to="/admin"
                        className="sidebar-link flex items-center text-gray-700 hover:text-indigo-500 p-2 rounded-md transition-colors duration-300"
                     >
                        <FontAwesomeIcon icon={faChartPie} className="mr-2 text-indigo-500" />
                        Dashboard
                     </Link>
                     <Link
                        to="/admin/reports"
                        className="sidebar-link flex items-center text-gray-700 hover:text-indigo-500 p-2 rounded-md transition-colors duration-300"
                     >
                        <FontAwesomeIcon icon={faClipboardList} className="mr-2 text-indigo-500" />
                        View Reports
                     </Link>
                     <Link
                        to="/admin/posts"
                        className="sidebar-link flex items-center text-gray-700 hover:text-indigo-500 p-2 rounded-md transition-colors duration-300"
                     >
                        <FontAwesomeIcon icon={faBlog} className="mr-2 text-indigo-500" />
                        Posts
                     </Link>
                     <Link
                        to={"/messages"}
                        className="sidebar-link flex items-center text-gray-700 hover:text-indigo-500 p-2 rounded-md transition-colors duration-300"
                     >
                        <FontAwesomeIcon icon={faCommentDots} className="mr-2 text-indigo-500" />
                        Messages
                     </Link>
                     <Link
                        to="/profile"
                        className="sidebar-link flex items-center text-gray-700 hover:text-indigo-500 p-2 rounded-md transition-colors duration-300"
                     >
                        <FontAwesomeIcon icon={faUserCircle} className="mr-2 text-indigo-500" />
                        My Profile
                     </Link>
                  </div>
               </div>
            </>
         ) : (
            <>
               {role === "user" && (
                  <>
                     <div className="sm:hidden  fixed bottom-4 right-4">
                        <button
                           onClick={toggleSidebar}
                           className="text-indigo-500 border-2 border-indigo-500 p-2 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300"
                        >
                           {showSidebar ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
                        </button>
                     </div>

                     {/* Sidebar */}
                     <div
                        className={`bg-white h-screen w-72 fixed top-8 left-0 flex flex-col justify-between shadow-lg transition-all duration-300 lg:translate-x-0 ${
                           showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                        }`}
                     >
                        <div className="p-4 flex flex-col space-y-4">
                           <Link
                              to="/"
                              className="flex items-center text-gray-700 hover:text-indigo-500 p-2 rounded-md transition-colors duration-300"
                           >
                              <FontAwesomeIcon icon={faHome} className="mr-2 text-indigo-500" />
                              Home
                           </Link>

                           <Link
                              to="/notifications"
                              className="relative flex items-center text-gray-700 hover:text-indigo-500 p-2 rounded-md transition-colors duration-300"
                           >
                              <FontAwesomeIcon icon={faBell} className="mr-2 text-indigo-500" />
                              Notifications
                           </Link>

                           <Link
                              to={"/messages"}
                              className="flex items-center text-gray-700 hover:text-indigo-500 p-2 rounded-md transition-colors duration-300"
                           >
                              <FontAwesomeIcon icon={faCommentDots} className="mr-2 text-indigo-500" />
                              Messages
                           </Link>

                           <Link
                              to={"/premium"}
                              className="flex items-center text-gray-700 hover:text-indigo-500 p-2 rounded-md transition-colors duration-300"
                           >
                              <FontAwesomeIcon icon={faCrown} className="mr-2 text-indigo-500" />
                              Premium
                           </Link>
                           <Link
                              to={`/profile`}
                              className="flex items-center text-gray-700 hover:text-indigo-500 p-2 rounded-md transition-colors duration-300"
                           >
                              <FontAwesomeIcon icon={faUserCircle} className="mr-2 text-indigo-500" />
                              My Profile
                           </Link>
                           <Link
                              to="/polls"
                              className="sidebar-link flex items-center text-gray-700 hover:text-indigo-500 p-2 rounded-md transition-colors duration-300"
                           >
                              <i className="fas fa-poll text-indigo-500 mr-2"></i>
                              New Poll
                           </Link>
                        </div>
                        <div className="p-4">
                           <button
                              onClick={() => dispatch(handleCreatePostModal())}
                              className="bg-indigo-500 hover:bg-indigo-600 mb-8 text-white font-semibold py-2 px-4 w-full rounded flex items-center justify-center transition-colors duration-300"
                           >
                              <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                              New Post
                           </button>
                        </div>
                     </div>
                  </>
               )}
            </>
         )}
      </>
   );
}

export default Menu;
