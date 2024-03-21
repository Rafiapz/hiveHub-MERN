import { createTransport, SendMailOptions } from "nodemailer";
import {Request,Response,NextFunction} from 'express'

export const generateOtp = (email:string) => {
  try {
    let OTP = Math.floor(1000 + Math.random() * 9000).toString();

    let timestamp = Date.now();

    const transporter = createTransport({
      service: "Gmail",
      auth: {
        user: "rafikandathuvayal@gmail.com",
        pass: process.env.googlePsw,
      },
    });

    transporter.verify((error, success) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Success", success);
        }
      });

    const sendOTPemail = (otp: string) => {

      const mailOptions = {
        from: "rafikandathuvayal@gmail.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending OTP:", error);
        } else {
          console.log("OTP sent:", info.response);
        }
      });
    };

    sendOTPemail(OTP)

    return {OTP,timestamp}
  } catch (error) {
    console.log(error);
  }
};





