import { FC, useEffect } from "react";
import Posts from "../post/Posts";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersPost } from "../../store/actions/post/postActions";
import { AppDispatch, RootState } from "../../store/store";

const UserPosts: FC = () => {
   const dispatch = useDispatch<AppDispatch>();
   const userId = useSelector((state: RootState) => state.user.user.userId);
   const likes: any = useSelector((state: RootState) => state?.posts?.posts?.likes);
   const posts: any = useSelector((state: RootState) => state.posts.posts.data);

   useEffect(() => {
      dispatch(fetchUsersPost(userId));
   });

   return (
      <div className="flex w-full ml-80">
         <Posts likes={likes} posts={posts} />
      </div>
   );
};

export default UserPosts;
