import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { signupSchema } from "../../../schemas/SignupSchema";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import SignupForm from "../../../components/signup/SignupForm";
import AuthBody from "../../../components/authBody/AuthBody";


function Signup() {
  
  return (
    <div className="flex w-full  overflow-auto">
      <AuthBody/>
      <SignupForm/>
    </div>
  );
}

export default Signup;
