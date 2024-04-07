import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import EditPost from "../post/EditPost";

function EditPostModal() {
   const isOpen = useSelector((state: RootState) => state.posts.editPostModal.isOpen);

   if (!isOpen) {
      document.body.style.overflow = "auto";
      return;
   } else {
      document.body.style.overflow = "hidden";
   }

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
         <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
         <div className="bg-white p-8 rounded-lg z-50 w-1/2">
            <EditPost />
         </div>
      </div>
   );
}

export default EditPostModal;
