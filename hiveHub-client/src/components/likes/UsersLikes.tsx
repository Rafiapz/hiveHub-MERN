import React, { FC, useEffect, useState } from "react";
import Posts from "../post/Posts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
   deletePostAction,
   fetchAllCommentsOfPost,
   fetchAllposts,
   fetchUsersLikedPosts,
   fetchUsersPost,
   likePostAction,
} from "../../store/actions/post/postActions";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { confirmationModalReducer } from "../../store/slices/user/userSlice";
import { handleCommentModal, handleEditPostModal, handleReportPostId, setSharePost } from "../../store/slices/posts/postSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faComment, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { format } from "timeago.js";
import ConfirmationModal from "../modal/ConfirmationModal";

const UsersLikes: FC = () => {
   const dispatch = useDispatch<AppDispatch>();
   const likes: any = useSelector((state: RootState) => state?.posts?.likedPosts?.likes);
   const posts: any = useSelector((state: RootState) => state?.posts?.likedPosts?.data);

   const userId = useSelector((state: RootState) => state.user.user.userId);
   const [curPostId, setCurPostId] = useState<number | null>();
   const [hasMore, setHasMore] = useState<boolean>(true);
   // const likes: any = useSelector((state: RootState) => state?.posts?.posts?.likes);
   // const posts: any = useSelector((state: RootState) => state.posts.posts.data);
   const [page, setPage] = useState<number>(1);
   const [items, setItems] = useState<any>(posts);

   useEffect(() => {
      dispatch(fetchUsersLikedPosts());
   }, []);

   const navigate = useNavigate();

   useEffect(() => {
      dispatch(fetchAllposts({ page })).then((response) => {
         if (response?.payload?.status !== "ok") {
            toast(response?.payload?.message, {
               style: { backgroundColor: "#ff6347", color: "#eeeeee" },
            });
         }
         setItems(response.payload?.data?.posts);
      });
   }, []);

   const [showOptions, setShowOptions] = useState<{
      status: boolean;
      index: number;
   }>({ status: false, index: 0 });

   const { pathname } = useLocation();

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
            if (pathname === "/profile") {
               dispatch(fetchUsersPost(userId));
            } else if (pathname === "/profile/likes") {
               dispatch(fetchUsersLikedPosts());
            } else {
               setItems((prev: any) => {
                  const newItems = prev.filter((item: any) => item._id != id);
                  console.log("length", newItems.length);

                  return newItems;
               });
            }
         } else {
            toast(response?.payload?.message, {
               style: { backgroundColor: "#ff6347", color: "#eeeeee" },
            });
         }
      });
      dispatch(fetchAllposts({ page }));
   };

   const handleLikePost = (id: number) => {
      dispatch(likePostAction(id)).then((response) => {
         dispatch(fetchUsersLikedPosts());
      });
   };

   const setClass = (itemId: any) => {
      return likes?.some((ob: any) => ob.postId === itemId && ob.userId === userId);
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

   const handleSharePost = (post: any) => {
      dispatch(setSharePost({ data: post }));
      // openSharePostModal();
   };

   return (
      <div className="flex  ml-80 overflow-hidden">
         <div className="min w-full">
            {posts?.map((item: any, i: number) => {
               return (
                  <div
                     key={item?._id + i}
                     className="bg-gray-50 w-2/3 ml-10 p-8 h-auto shadow-lg mx-auto mt-2"
                     onClick={() => setShowOptions({ index: i, status: false })}
                  >
                     <div className="flex items-center hover:cursor-pointer">
                        <img src={item?.userId?.profilePhoto} alt="User" className="rounded-full  h-8 w-10 mr-2" />
                        <p className="font-bold min-w-30 max-w-30" onClick={() => viewOthersProfile(item?.userId?._id, item?.userId?.email)}>
                           {item?.userId?.fullName}
                        </p>
                        <div className="">
                           <p className="text-sm ml-10 font-bold  text-gray-500">{format(item?.createdAt)}</p>
                        </div>
                        <div className="min-w-80"></div>

                        {showOptions?.status == true && showOptions?.index === i && (
                           <div
                              style={{ marginLeft: "620px" }}
                              className="z-10 absolute mt-1  w-28 h-22 bg-gray-200  border border-gray-300 shadow-lg rounded-md"
                           >
                              <ul className="">
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
                                          className="p-1 hover:bg-white"
                                       >
                                          <button>Edit</button>
                                       </li>
                                       <li onClick={() => handleDeletePostModal(item?._id)} className="p-1 hover:bg-white">
                                          <button>Delete</button>
                                       </li>
                                    </>
                                 )}
                                 {userId !== item?.userId?._id && (
                                    <li
                                       className="p-1  hover:bg-white"
                                       onClick={() => {
                                          dispatch(handleReportPostId({ postId: item?._id }));
                                          // openModal();
                                       }}
                                    >
                                       <button>Report</button>
                                    </li>
                                 )}
                              </ul>
                           </div>
                        )}
                        <div style={{ marginLeft: "740px" }} className="rounded-lg  absolute ">
                           <div
                              onClick={(e) => {
                                 e.stopPropagation(), handleOptionsClick(i);
                              }}
                              className=" flex flex-col gap-1 hover:bg-gray-200 w-4 h-10 justify-center items-center"
                           >
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                           </div>
                        </div>
                     </div>

                     <p className="p-4 ">{item?.content}</p>

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
                           <div onClick={() => handleSharePost(item)}>
                              <FontAwesomeIcon
                                 icon={faShare}
                                 className="mr-4 text-yellow-300 size-7 cursor-pointer text-xl hover:text-green-600 transition duration-300"
                              />
                              <p>{item?.shares}</p>
                           </div>
                        </div>

                        <div>
                           <FontAwesomeIcon icon={faBookmark} className="text-gray-500 size-7 cursor-pointer" />
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
         <ConfirmationModal curId={curPostId} handleDelete={handleDelete} />
      </div>
   );
};

export default UsersLikes;
