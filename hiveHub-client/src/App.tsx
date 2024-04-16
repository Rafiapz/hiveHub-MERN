import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Signup from "./pages/auth/signup/Signup";
import Layout from "./pages/layout/Layout";
import Home from "./pages/user/home/Home";
import Login from "./pages/auth/login/Login";
import Verification from "./pages/auth/verification/Verification";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { fetchuser } from "./store/actions/auth/userActions";
import Profile from "./pages/user/profile/Profile";
import EditProfile from "./pages/user/profile/EditProfile";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/auth/login/resetPassword/ResetPassword";
import UserPosts from "./components/activity/UsersPosts";
import Following from "./components/networks/Following";
import Followers from "./components/networks/Followers";
import OthersProfile from "./pages/user/othersProfile/OthersProfile";
import OthersPost from "./components/OthersPost/OthersPost";
import OthersProfilePosts from "./components/othersProfilePost/OthersProfilePosts";
import UsersLikes from "./components/likes/UsersLikes";
import Messages from "./pages/message/Messages";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import BlockedUser from "./components/blockedUser/BlockedUser";

function App() {
   const auth = useSelector((state: RootState) => state?.user?.user?.auth?.isAuth);
   const userData: any = useSelector((state: RootState) => state?.user?.user?.data);
   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      dispatch(fetchuser());
   }, []);

   return (
      <>
         <Toaster position="top-center" containerClassName="text-red-500" />

         {!auth ? (
            <>
               <Routes>
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/" element={<Login />} />
                  <Route path="/verification" element={<Verification />} />
                  <Route path="/profile" element={<Login />} />
                  <Route path="/edit-profile" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/others-profile" element={<Login />} />
                  <Route path="/dashboard" element={<Login />} />
                  <Route path="/messages" element={<Login />} />
               </Routes>
            </>
         ) : (
            <>
               {userData && userData?.isBlocked !== true ? (
                  <Routes>
                     <Route path="/" element={<Home />} />
                     <Route path="/messages" element={<Messages />} />
                     <Route path="/profile" element={<Profile />}>
                        <Route index element={<UserPosts />} />
                        <Route path="/profile/following" element={<Following />} />
                        <Route path="/profile/followers" element={<Followers />} />
                        <Route path="/profile/likes" element={<UsersLikes />} />
                        <Route path="/profile/reports" element={<Followers />} />
                     </Route>
                     <Route path="/edit-profile" element={<EditProfile />} />
                     <Route path="/others-profile" element={<OthersProfile />}>
                        <Route index element={<OthersProfilePosts />} />
                     </Route>
                     <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
               ) : (
                  <BlockedUser />
               )}
            </>
         )}
      </>
   );
}
export default App;
