import { FC, useEffect, useState } from "react";
import Loading from "../loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faComment, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { fetchAllCommentsOfPost, fetchUsersPost, likePostAction } from "../../store/actions/post/postActions";
import { handleCommentModal } from "../../store/slices/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useSearchParams } from "react-router-dom";

const OthersPost: FC = () => {
   const dispatch = useDispatch<AppDispatch>();
   const loading = useSelector((state: RootState) => state.posts.posts.loading);
   const likes: any = useSelector((state: RootState) => state?.posts?.posts?.likes);
   const posts: any = useSelector((state: RootState) => state.posts.posts.data);

   const [showOptions, setShowOptions] = useState<{
      status: boolean;
      index: number;
   }>({ status: false, index: 0 });

   const [searchQuery, setSearchQuery] = useSearchParams();

   const userId = searchQuery.get("userId");
   useEffect(() => {
      dispatch(fetchUsersPost(userId));
   }, [userId]);

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

   const handleLikePost = (id: number) => {
      dispatch(likePostAction(id)).then(() => {
         dispatch(fetchUsersPost(userId));
      });
   };

   const setClass = (itemId: any) => {
      return likes.some((ob: any) => ob.postId === itemId && ob.userId === userId);
   };

   const handleShowComments = (id: number) => {
      dispatch(fetchAllCommentsOfPost(id)).then((response: any) => {
         if (response?.payload?.status === "ok") {
            dispatch(handleCommentModal({ status: true, postId: id }));
         }
      });
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
                           <div className="flex items-center hover:cursor-pointer">
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
                                    {userId !== item?.userId?._id && (
                                       <li className="p-1 hover:bg-blue-500">
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
      </>
   );
};

export default OthersPost;
