import { FC, useState } from "react";
import AuthBody from "../authBody/AuthBody";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { emailSchema } from "../../schemas/SignupSchema";
import { forgotPasswordSendEmail } from "../../service/api";
import toast from "react-hot-toast";
import LoadingButton from "../loading/LoadingButton";

const ForgotPassword: FC = () => {
   const [loading, setLoading] = useState(false);
   const handleSubmit = (values: { email: string }, { resetForm }: any) => {
      setLoading(true);
      const { email } = values;
      forgotPasswordSendEmail(email).then((response: any) => {
         setLoading(false);

         if (response.data.status === "ok") {
            toast.success("A reset password confirmation email has sent to your email id please verify", {
               style: { backgroundColor: "#4caf50", color: "white" },
               duration: 10000,
            });
         } else {
            toast.error(response.data.message, { style: { backgroundColor: "#ff6347", color: "#eeeeee" } });
         }
      });
   };
   return (
      <div className="flex w-full   overflow-auto">
         <AuthBody />
         <div className="forgot-password-container flex flex-col items-center mt-32  h-screen">
            <h2 className="text-2xl font-medium text-gray-800">Don't worry, we've got you covered!</h2>
            <p className="text-gray-600 mt-4 text-center">
               It happens to the best of us. Enter your email address below, and we'll send you a confirmation email to reset your password.
            </p>

            <Formik initialValues={{ email: "" }} onSubmit={handleSubmit} validationSchema={emailSchema}>
               <Form className="p-8  w-96">
                  <div className="flex flex-col space-y-2">
                     <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address:
                     </label>
                     <Field
                        name="email"
                        type="email"
                        className="p-2 w-full border bg-gray-200 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                     />
                     <ErrorMessage name="email" component="span" className="text-red-500 text-sm" />
                  </div>
                  {loading ? (
                     <LoadingButton />
                  ) : (
                     <button type="submit" className="mt-4 w-32 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700">
                        Continue
                     </button>
                  )}
               </Form>
            </Formik>
         </div>
      </div>
   );
};

export default ForgotPassword;
