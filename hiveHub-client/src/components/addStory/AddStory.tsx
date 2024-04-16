import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import Modal from "react-modal";
import { uploadStory } from "../../service/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const AddStory: FC<any> = ({ modalIsOpen, closeModal }: any) => {
   const userId: any = useSelector((state: RootState) => state?.user?.user?.userId);
   const [imageUrl, setImageUrl] = useState<string>("");
   const [error, setError] = useState<string>("");
   const [content, setContent] = useState<string>("");
   const [image, setImage] = useState<File | null>(null);

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
         setImage(file);
         if (!["image/jpeg", "image/png", "image/gif", "video/mp4", "video/webm", "video/ogg"].includes(file.type)) {
            setError("Please select a valid image file (JPEG, PNG, GIF)");
            return;
         } else {
            setError("");
         }
         if (e?.target?.files?.[0]) {
            const url = URL.createObjectURL(e?.target?.files[0]);
            setImageUrl(url);
            console.log(url);
         }
      }
   };

   const handleCancel = () => {
      setImage(null);
      setImageUrl("");
      closeModal();
   };

   const handleSubmit = () => {
      const formData = new FormData();

      formData.append("userId", userId);

      if (image) formData.append("image", image);
      else {
         toast.error("failed to upload photo");
         return;
      }

      try {
         uploadStory(formData).then((response) => {
            toast.success(response?.data?.message);
            handleCancel();
         });
      } catch (error: any) {
         toast.error(error.message);
      }
   };

   return (
      <div className="flex items-center justify-center">
         <Modal
            appElement={document.getElementById("root") as HTMLElement}
            overlayClassName="modal-bg-overlay"
            className="bg-white w-96  overflow-auto  shadow-xl rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Report Post Modal"
         >
            <div className="bg-gray-200 w-full mt-2 p-4 shadow-lg mx-auto rounded-md">
               <h2 className="text-xl font-bold text-center mb-4">Add Story</h2>
               <div className="flex flex-col gap-3 mb-4">
                  <label htmlFor="image-upload" className="cursor-pointer flex items-center">
                     <FontAwesomeIcon icon={faImage} className="text-blue-500 mr-2" />
                     Upload Photo
                  </label>
                  <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
               </div>
               <div className="flex justify-center items-center border border-gray-300 border-dashed p-4 rounded-md mb-4">
                  {imageUrl && (
                     <div>
                        <img src={imageUrl} alt="Uploaded" className="max-w-60 max-h-60 p-1" />
                        <i onClick={() => setImageUrl("")} className="fa-regular fa-circle-xmark fa-2x cursor-pointer"></i>
                     </div>
                  )}
               </div>

               <div className="flex justify-end">
                  <button onClick={handleCancel} className="bg-gray-300 text-black font-bold py-2 px-4 rounded mr-2">
                     Cancel
                  </button>
                  <button onClick={handleSubmit} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                     Submit
                  </button>
               </div>
            </div>
         </Modal>
      </div>
   );
};

export default AddStory;