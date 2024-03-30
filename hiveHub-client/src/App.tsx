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

function App() {
   const auth = useSelector((state: RootState) => state.user.user.auth.isAuth);
   const user = useSelector((state: RootState) => state.user.user.auth.role);
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
               </Routes>
            </>
         ) : user === "user" ? (
            <>
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
               </Routes>
            </>
         ) : (
            <></>
         )}
      </>
   );
}

export default App;
