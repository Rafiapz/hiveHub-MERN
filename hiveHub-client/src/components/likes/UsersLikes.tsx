import React, { FC, useEffect, useState } from "react";
import Posts from "../post/Posts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchUsersLikedPosts, fetchUsersPost } from "../../store/actions/post/postActions";
import toast from "react-hot-toast";

const UsersLikes: FC = () => {
   const dispatch = useDispatch<AppDispatch>();
   const userId = useSelector((state: RootState) => state?.user?.user?.userId);
   const likes: any = useSelector((state: RootState) => state?.posts?.likedPosts?.likes);
   const posts: any = useSelector((state: RootState) => state?.posts?.likedPosts?.data);

   useEffect(() => {
      dispatch(fetchUsersLikedPosts());
   }, [likes]);

   return (
      <div className="flex  ml-80 overflow-hidden">
         <Posts likes={likes} posts={posts} />
      </div>
   );
};

export default UsersLikes;
