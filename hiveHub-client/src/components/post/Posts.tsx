import React, { FC } from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faShare, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { deletePostAction, fetchAllCommentsOfPost, fetchAllposts, fetchUsersPost, likePostAction } from "../../store/actions/post/postActions";
import Loading from "../loading/Loading";
import toast from "react-hot-toast";
import ConfirmationModal from "../modal/ConfirmationModal";
import { confirmationModalReducer } from "../../store/slices/user/userSlice";
import { handleCommentModal, handleEditPostModal, handleReportPostId } from "../../store/slices/posts/postSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Posts = ({ openModal }: any) => {
   const dispatch = useDispatch<AppDispatch>();
   const loading = useSelector((state: RootState) => state.posts.posts.loading);
   const userId = useSelector((state: RootState) => state.user.user.userId);
   const [curPostId, setCurPostId] = useState<number | null>();
   const likes: any = useSelector((state: RootState) => state?.posts?.posts?.likes);
   const posts: any = useSelector((state: RootState) => state.posts.posts.data);

   const navigate = useNavigate();

   const [showOptions, setShowOptions] = useState<{
      status: boolean;
      index: number;
   }>({ status: false, index: 0 });

   const { pathname } = useLocation();

   useEffect(() => {
      if (pathname === "/profile") {
         dispatch(fetchUsersPost(userId));
      } else {
         dispatch(fetchAllposts()).then((data) => {
            if (data?.payload?.status !== "ok")
               toast(data?.payload?.message, {
                  style: { backgroundColor: "#ff6347", color: "#eeeeee" },
               });
         });
      }
   }, []);

   const handleOptionsClick = (index: number) => {
      setShowOptions((prev) => {
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

   const handleDeletePostModal = (id: number) => {
      setCurPostId(id);
      dispatch(confirmationModalReducer({ status: true }));
   };

   const handleDelete = (id: number) => {
      dispatch(confirmationModalReducer({ status: false }));

      dispatch(deletePostAction(id)).then((response) => {
         if (response?.payload?.status === "ok") {
            toast(response?.payload?.message, {
               style: { backgroundColor: "#4caf50", color: "white" },
            });
            dispatch(fetchAllposts());
         } else {
            toast(response?.payload?.message, {
               style: { backgroundColor: "#ff6347", color: "#eeeeee" },
            });
         }
      });
   };

   const handleLikePost = (id: number) => {
      dispatch(likePostAction(id)).then(() => {
         if (pathname === "/profile") {
            dispatch(fetchUsersPost(userId));
         } else {
            {
               dispatch(fetchAllposts());
            }
         }
      });
   };

   const setClass = (itemId: any) => {
      return likes.some((ob: any) => ob.postId === itemId && ob.userId === userId);
   };

   const handleShowComments = (id: number) => {
      dispatch(fetchAllCommentsOfPost(id)).then((response) => {
         if (response.payload.status === "ok") {
            dispatch(handleCommentModal({ status: true, postId: id }));
         }
      });
   };

   const viewOthersProfile = (id: number, email: string) => {
      navigate(`/others-profile?userId=${id}&email=${email}`);
   };

   return (
      <>
         {loading ? (
            <Loading />
         ) : (
            <>
               {posts?.map((item: any, i: number) => {
                  return (
                     <div
                        key={item?._id}
                        className="bg-gray-50 w-1/2 p-4 shadow-lg mx-auto mt-2 relative"
                        onClick={() => setShowOptions({ index: i, status: false })}
                     >
                        <div className="flex items-center justify-between mb-4 ">
                           <div
                              className="flex items-center hover:cursor-pointer"
                              onClick={() => viewOthersProfile(item?.userId?._id, item?.userId?.email)}
                           >
                              <img src={item?.userId?.profilePhoto} alt="User" className="rounded-full h-8 w-8 mr-2" />
                              <p className="font-bold">{item?.userId.fullName}</p>
                           </div>
                           <p className="text-sm mr-20 font-bold text-blue-400">
                              {new Date(item?.createdAt).toLocaleString("en-GB", {
                                 day: "2-digit",
                                 month: "2-digit",
                                 year: "numeric",
                              })}
                           </p>
                        </div>

                        {item?.media?.type === "image" && <img src={`${item?.media?.path}`} alt="Posted" className="mb-4 rounded-lg w-full" />}
                        {item?.media?.type === "video" && <video controls src={`${item?.media?.path}`}></video>}

                        <div className="flex justify-between items-center">
                           <div className="flex">
                              <div>
                                 <FontAwesomeIcon
                                    key={item?.id}
                                    onClick={() => {
                                       handleLikePost(item?._id);
                                    }}
                                    icon={faHeart}
                                    className={`${
                                       setClass(item?._id) ? "text-red-600" : "text-gray-400"
                                    }  mr-4 size-7 cursor-pointer text-xl hover:text-red-600 transition duration-300`}
                                 />
                                 <p>{item?.likes}</p>
                              </div>
                              <div>
                                 <FontAwesomeIcon
                                    icon={faComment}
                                    className="mr-4 text-blue-500 size-7 cursor-pointer text-xl hover:text-blue-600 transition duration-300"
                                    onClick={() => {
                                       handleShowComments(item?._id);
                                    }}
                                 />
                                 <p>{item?.comments}</p>
                              </div>
                              <div>
                                 <FontAwesomeIcon
                                    icon={faShare}
                                    className="mr-4 text-yellow-300 size-7 cursor-pointer text-xl hover:text-green-600 transition duration-300"
                                 />
                                 <p>{item?.shares?.length}</p>
                              </div>
                           </div>

                           <div>
                              <FontAwesomeIcon icon={faBookmark} className="text-gray-500 size-7 cursor-pointer" />
                           </div>

                           {/* Three dots menu */}

                           <div className="absolute top-0 right-0 mt-2 mr-4">
                              <div
                                 onClick={(e) => {
                                    e.stopPropagation(), handleOptionsClick(i);
                                 }}
                                 className="relative flex flex-col gap-1 hover:bg-gray-200 w-4 h-10 justify-center items-center"
                              >
                                 <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                 <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                 <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              </div>
                           </div>

                           {/* Options menu */}
                           {showOptions?.status == true && showOptions?.index === i && (
                              <div className="absolute top-1  right-4 w-28 h-22 bg-blue-300 mt-2 mr-4 border border-gray-300 shadow-lg rounded-md">
                                 <ul>
                                    {userId === item?.userId?._id && (
                                       <>
                                          <li
                                             onClick={() =>
                                                dispatch(
                                                   handleEditPostModal({
                                                      status: true,
                                                      content: item?.content,
                                                      media: {
                                                         type: item?.media?.type,
                                                         url: item?.media?.path,
                                                      },
                                                      _id: item?._id,
                                                   })
                                                )
                                             }
                                             className="p-1 hover:bg-blue-500"
                                          >
                                             <button>Edit</button>
                                          </li>
                                          <li onClick={() => handleDeletePostModal(item?._id)} className="p-1 hover:bg-blue-500">
                                             <button>Delete</button>
                                          </li>
                                       </>
                                    )}
                                    {userId !== item?.userId?._id && (
                                       <li
                                          className="p-1 hover:bg-blue-500"
                                          onClick={() => {
                                             dispatch(handleReportPostId({ postId: item?._id }));
                                             openModal();
                                          }}
                                       >
                                          <button>Report</button>
                                       </li>
                                    )}
                                 </ul>
                              </div>
                           )}
                        </div>
                     </div>
                  );
               })}
            </>
         )}
         <ConfirmationModal curId={curPostId} handleDelete={handleDelete} />
      </>
   );
};

export default Posts;
