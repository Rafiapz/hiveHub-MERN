import React, { FC, useState } from "react";
import Menu from "../../../components/menu/Menu";
import RightSideBar from "../../../components/rightSideBar/RightSideBar";
import { premiumOrder } from "../../../service/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

// declare global {
//     interface Window {
//        Razorpay: any; // or specify the exact type if available
//     }
//  }

const Premium: FC = () => {
   const [isLoading, setIsLoading] = useState(false);
   const userId: any = useSelector((state: RootState) => state?.user?.user?.userId);

   const handleOrder = async () => {
      try {
         setIsLoading(true);

         const amount: any = 69900;
         const formData = new FormData();
         formData.append("userId", userId);
         formData.append("amount", amount);
         const response = await premiumOrder(formData);

         var options = {
            key: "rzp_test_n7T0wcONYZwk3H",
            amount: "69900",
            currency: "INR",
            name: "hiveHub",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: response?.data?.order_id,
            handler: function (response: any) {
               alert(response.razorpay_payment_id);
               alert(response.razorpay_order_id);
               alert(response.razorpay_signature);
            },
            prefill: {
               //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
               name: "Gaurav Kumar", //your customer's name
               email: "gaurav.kumar@example.com",
               contact: "9000090000", //Provide the customer's phone number for better conversion rates
            },
            notes: {
               address: "Razorpay Corporate Office",
            },
            theme: {
               color: "#3399cc",
            },
         };
         var rzp1 = new window.Razorpay(options);
         setIsLoading(false);
         rzp1.open();
      } catch (error: any) {
         setIsLoading(false);
         toast.error(error?.message);
      }
   };

   return (
      <>
         <Menu />
         <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl">
               <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Upgrade to Premium</h2>
               <p className="text-gray-600 mb-8 text-center">Get access to exclusive features and content by upgrading to our premium plan.</p>

               <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Premium Benefits</h3>
                  <ul className="list-disc pl-4">
                     <li className="mb-2">Premium Badge on your profile</li>
                     <li className="mb-2">Access to exclusive content and features</li>
                     <li className="mb-2">Ad-free experience</li>
                     <li className="mb-2">Priority support</li>
                  </ul>
               </div>

               <div className="mb-6">
                  <p className="text-gray-600 mb-2 text-center">Price: ₹699/month</p>
                  <p className="text-gray-600 mb-6 text-center">Free trial available for 7 days</p>
               </div>

               <div className="flex justify-center mb-6">
                  <button
                     className="bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-600 transition-colors duration-300 flex items-center"
                     onClick={handleOrder}
                  >
                     {isLoading ? (
                        <>
                           <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                           >
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path
                                 className="opacity-75"
                                 fill="currentColor"
                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                           </svg>
                           Processing...
                        </>
                     ) : (
                        <>
                           <span className="mr-2">Upgrade Now</span>
                           <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                 fillRule="evenodd"
                                 d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                 clipRule="evenodd"
                              />
                           </svg>
                        </>
                     )}
                  </button>
               </div>

               <p className="text-gray-600 text-center text-sm">
                  By clicking "Upgrade Now", you agree to our{" "}
                  <a href="#" className="text-indigo-600">
                     Terms and Conditions
                  </a>
                  .
               </p>
            </div>
         </div>

         <RightSideBar />
      </>
   );
};

export default Premium;