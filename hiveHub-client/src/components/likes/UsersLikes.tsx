import React, { FC, useEffect, useState } from "react";
import Posts from "../post/Posts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchUsersLikedPosts } from "../../store/actions/post/postActions";

const UsersLikes: FC = () => {
   const dispatch = useDispatch<AppDispatch>();
   const likes: any = useSelector((state: RootState) => state?.posts?.likedPosts?.likes);
   const posts: any = useSelector((state: RootState) => state?.posts?.likedPosts?.data);

   useEffect(() => {
      dispatch(fetchUsersLikedPosts());
   }, []);

   return (
      <div className="flex  ml-80 overflow-hidden">
         <Posts likes={likes} posts={posts} />
      </div>
   );
};

export default UsersLikes;
