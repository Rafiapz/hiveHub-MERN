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
import { handleCommentModal, handleEditPostModal, handleFetchMore, handleReportPostId, setSharePost } from "../../store/slices/posts/postSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import InfiniteScroll from "react-infinite-scroll-component";
import EditPostModal from "../modal/EditPostModal";

const Posts: FC<any> = ({ openModal, openSharePostModal }: any) => {
   const dispatch = useDispatch<AppDispatch>();
   const userId = useSelector((state: RootState) => state.user.user.userId);
   const [curPostId, setCurPostId] = useState<number | null>();
   const [hasMore, setHasMore] = useState<boolean>(true);
   const likes: any = useSelector((state: RootState) => state?.posts?.posts?.likes);
   const posts: any = useSelector((state: RootState) => state.posts.posts.data);
   const [page, setPage] = useState<number>(1);
   const [items, setItems] = useState<any>(posts);

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
         if (pathname === "/profile") {
            dispatch(fetchUsersPost(userId));
         } else {
            const post = response?.payload?.post;
            dispatch(fetchAllposts({ page })).then(() => {
               setItems((prev: any) => {
                  const newItems = prev.map((item: any) => {
                     if (item._id === id) {
                        return { ...item, likes: post.likes };
                     }
                     return item;
                  });
                  return newItems;
               });
            });
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

   const handleSharePost = (post: any) => {
      dispatch(setSharePost({ data: post }));
      openSharePostModal();
   };

   const fetchMore = () => {
      dispatch(fetchAllposts({ page: page + 1 }))
         .then((response: any) => {
            setPage(page + 1);
            if (response?.payload?.data?.posts?.length >= 1) {
               setItems((prev: any) => [...prev, ...response.payload?.data?.posts]);
            } else {
               setPage(1);
               dispatch(fetchAllposts({ page: 1 })).then((res) => {
                  setItems((prev: any) => [...prev, ...res.payload?.data?.posts]);
               });
            }
         })
         .catch(() => {
            toast.error("error");
         });
   };

   return (
      <>
         <div className="min w-full">
            <InfiniteScroll
               dataLength={items?.length}
               next={() => fetchMore()}
               hasMore={hasMore}
               loader={
                  <div className="bg-gray-50 w-2/3 ml-10 p-8 h-auto shadow-lg mx-auto mt-2 " key={46597}>
                     <Loading />
                  </div>
               }
            >
               {items?.map((item: any, i: number) => {
                  return (
                     <div
                        key={item?._id + i}
                        className="bg-white w-2/3 ml-10 p-8 rounded-lg shadow-md mx-auto mt-2 hover:shadow-lg transition-shadow duration-300 relative"
                        onClick={() => setShowOptions({ index: i, status: false })}
                     >
                        <div className="absolute top-2 right-2">
                           <div
                              onClick={(e) => {
                                 e.stopPropagation(), handleOptionsClick(i);
                              }}
                              className="flex  gap-1  items-center justify-center w-14 h-6 rounded-full hover:bg-gray-200 cursor-pointer"
                           >
                              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                           </div>
                        </div>

                        <div className="flex items-center hover:cursor-pointer">
                           <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                              <img src={item?.userId?.profilePhoto} alt="User" className="w-full h-full object-cover" />
                           </div>
                           <div className="flex-grow">
                              <p className="font-bold text-gray-800" onClick={() => viewOthersProfile(item?.userId?._id, item?.userId?.email)}>
                                 {item?.userId?.fullName}
                              </p>
                              <p className="text-sm text-gray-500">{format(item?.createdAt)}</p>
                           </div>
                           {showOptions?.status && showOptions?.index === i && (
                              <div className="absolute right-16 mt-1 z-10 w-28 bg-white border border-gray-400 shadow-lg rounded-md">
                                 <ul className="py-1">
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
                                             className="p-2 hover:bg-gray-100 cursor-pointer"
                                          >
                                             Edit
                                          </li>
                                          <li onClick={() => handleDeletePostModal(item?._id)} className="p-2 hover:bg-gray-100 cursor-pointer">
                                             Delete
                                          </li>
                                       </>
                                    )}
                                    {userId !== item?.userId?._id && (
                                       <li
                                          className="p-2 hover:bg-gray-100 cursor-pointer"
                                          onClick={() => {
                                             dispatch(handleReportPostId({ postId: item?._id }));
                                             openModal();
                                          }}
                                       >
                                          Report
                                       </li>
                                    )}
                                 </ul>
                              </div>
                           )}
                        </div>

                        <p className="py-4 text-gray-700">{item?.content}</p>

                        {item?.media?.type === "image" && <img src={`${item?.media?.path}`} alt="Posted" className="mb-4 rounded-lg w-full" />}
                        {item?.media?.type === "video" && <video controls src={`${item?.media?.path}`}></video>}

                        <div className="flex justify-between items-center mt-4">
                           <div className="flex items-center">
                              <div className="flex items-center mr-8 cursor-pointer">
                                 <FontAwesomeIcon
                                    key={item?.id}
                                    onClick={() => {
                                       handleLikePost(item?._id);
                                    }}
                                    icon={faHeart}
                                    className={`${
                                       setClass(item?._id) ? "text-red-600" : "text-gray-400"
                                    } mr-2 text-xl hover:text-red-600 transition duration-300`}
                                 />
                                 <p>{item?.likes}</p>
                              </div>
                              <div className="flex items-center mr-8 cursor-pointer">
                                 <FontAwesomeIcon
                                    icon={faComment}
                                    className="mr-2 text-blue-500 text-xl hover:text-blue-600 transition duration-300"
                                    onClick={() => {
                                       handleShowComments(item?._id);
                                    }}
                                 />
                                 <p>{item?.comments}</p>
                              </div>
                              <div className="flex items-center mr-8 cursor-pointer" onClick={() => handleSharePost(item)}>
                                 <FontAwesomeIcon
                                    icon={faShare}
                                    className="mr-2 text-yellow-300 text-xl hover:text-green-600 transition duration-300"
                                 />
                                 <p>{item?.shares}</p>
                              </div>
                           </div>

                           <div className="cursor-pointer">
                              <FontAwesomeIcon icon={faBookmark} className="text-gray-500 text-xl hover:text-gray-700 transition duration-300" />
                           </div>
                        </div>
                     </div>
                  );
               })}
            </InfiniteScroll>
         </div>
         <EditPostModal items={items} setItems={setItems} />
         <ConfirmationModal curId={curPostId} handleDelete={handleDelete} />
      </>
   );
};

export default Posts;
