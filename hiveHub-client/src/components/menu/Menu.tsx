import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBell, faEnvelope, faBookmark, faUsers, faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { handleCreatePostModal } from "../../store/slices/posts/postSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

function Menu() {
   const dispatch = useDispatch();

   const [showSidebar, setShowSidebar] = useState(true);

   const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
   };

   return (
      <>
         <div className="sm:hidden fixed top-4 right-4 z-10">
            <button onClick={toggleSidebar} className="bg-gray-200 p-2 rounded-md">
               {showSidebar ? "Hide" : "Show"} Sidebar
            </button>
         </div>
         <div className={`bg-gray-50 h-full w-72 fixed flex flex-col justify-between shadow-lg ${showSidebar ? "block" : "hidden"} sm:block`}>
            <div className="p-4 flex flex-col space-y-4">
               <Link to="/" className="flex items-center hover:bg-gray-100 p-2 rounded-md">
                  <FontAwesomeIcon icon={faHome} className="mr-2 text-gray-700" />
                  Home
               </Link>

               <a href="#" className="flex items-center hover:bg-gray-100 p-2 rounded-md">
                  <FontAwesomeIcon icon={faBell} className="mr-2 text-gray-700" />
                  Notifications
               </a>

               <Link to={"/messages"} className="flex items-center hover:bg-gray-100 p-2 rounded-md">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-700" />
                  Messages
               </Link>

               <a href="#" className="flex items-center hover:bg-gray-100 p-2 rounded-md">
                  <FontAwesomeIcon icon={faBookmark} className="mr-2 text-gray-700" />
                  Bookmarks
               </a>

               <a href="#" className="flex items-center hover:bg-gray-100 p-2 rounded-md">
                  <FontAwesomeIcon icon={faUsers} className="mr-2 text-gray-700" />
                  Groups
               </a>

               <Link to="/profile" className="flex items-center hover:bg-gray-100 p-2 rounded-md">
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-700" />
                  My Profile
               </Link>

               <br />
               <button
                  onClick={() => dispatch(handleCreatePostModal())}
                  className="border-pink-300 border-2 hover:bg-pink-400 hover:text-white text-black font-semibold py-2 px-4 w-32 rounded flex items-center justify-center"
               >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  New Post
               </button>
            </div>
         </div>
      </>
   );
}

export default Menu;
