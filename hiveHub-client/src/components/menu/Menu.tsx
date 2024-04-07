import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBell, faEnvelope, faBookmark, faUsers, faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { handleCreatePostModal } from "../../store/slices/posts/postSlice";
import { Link } from "react-router-dom";

function Menu() {
   const dispatch = useDispatch();

   return (
      <div className="bg-gray-50 h-full w-72 fixed flex flex-col justify-between shadow-lg">
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
               className=" border-pink-300 border-2 hover:bg-pink-400 hover:text-white text-black font-semibold py-2  px-4 w-32 rounded flex items-center justify-center " // Added width and margin-top
            >
               <FontAwesomeIcon icon={faPlus} className="mr-2" />
               New Post
            </button>
         </div>
      </div>
   );
}

export default Menu;

// <div className="bg-gray-50 h-full w-80 fixed top-0 left-0 flex flex-col justify-between shadow-lg">
//          <div className="p-4">
//             <Link to={"/"} className="text-gray-800 flex items-center mb-4">
//                <FontAwesomeIcon icon={faHome} className="mr-2" />
//                Home
//             </Link>

//             <a href="#" className="text-gray-800 flex items-center mb-4">
//                <FontAwesomeIcon icon={faBell} className="mr-2" />
//                Notifications
//             </a>
//             <a href="#" className="text-gray-800 flex items-center mb-4">
//                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
//                Messages
//             </a>
//             <a href="#" className="text-gray-800 flex items-center mb-4">
//                <FontAwesomeIcon icon={faBookmark} className="mr-2" />
//                Bookmarks
//             </a>
//             <a href="#" className="text-gray-800 flex items-center mb-4">
//                <FontAwesomeIcon icon={faUsers} className="mr-2" />
//                Groups
//             </a>
//             <Link className="text-gray-800 flex items-center mb-4" to={"/profile"}>
//                <FontAwesomeIcon icon={faUser} className="mr-2" />
//                My Profile
//             </Link>

//             <button
//                onClick={() => dispatch(handleCreatePostModal())}
//                className="bg-pink-300 hover:bg-pink-400 text-black font-bold py-2 px-4 rounded mt-4"
//             >
//                <FontAwesomeIcon icon={faPlus} className="mr-2" />
//                New Post
//             </button>
//          </div>
//       </div>
