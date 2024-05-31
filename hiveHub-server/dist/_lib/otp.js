"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = exports.generateOtp = void 0;
const nodemailer_1 = require("nodemailer");
const Mailgen = require('mailgen');
const generateOtp = (email) => {
    try {
        let OTP = Math.floor(1000 + Math.random() * 9000).toString();
        let timestamp = Date.now();
        const transporter = (0, nodemailer_1.createTransport)({
            service: "Gmail",
            auth: {
                user: process.env.email,
                pass: process.env.googlePsw,
            },
        });
        transporter.verify((error, success) => {
            if (error) {
                console.log(error);
            }
            else {
            }
        });
        const sendOTPemail = (otp) => {
            const mailOptions = {
                from: "rafikandathuvayal@gmail.com",
                to: email,
                subject: "Your OTP Code",
                text: `Your OTP code is: ${otp}`,
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending OTP:", error);
                }
                else {
                }
            });
        };
        sendOTPemail(OTP);
        return { OTP, timestamp };
    }
    catch (error) {
        console.log(error);
    }
};
exports.generateOtp = generateOtp;
const sendVerificationEmail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.googlePsw
        }
    };
    const transport = (0, nodemailer_1.createTransport)(config);
    const MailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: "hiveHub",
            link: 'https://mailgen.js/'
        }
    });
    const responsePage = {
        body: {
            name: "Email Conformation Success!",
            intro: `Dear User,

        Your security is our utmost concern. To ensure the safety of your account, we kindly request you to verify your email address and reset your password using the following steps:
        Click the below button. 
        You will be directed to a secure page where you can confirm your email address.
        After email verification, you'll be prompted to set a new password for your account.
        
        Please note that the verification link is only valid for the next 10 minutes for security reasons. If you don't complete the process within this time frame, you may need to request another email.`,
            action: {
                button: {
                    color: '#22BC66',
                    text: 'Change Your Password',
                    link: `http://localhost:5173/reset-password?token=${token}`
                }
            },
            outro: "Thank you for choosing us, and we appreciate your trust in our services"
        }
    };
    const mail = MailGenerator.generate(responsePage);
    const message = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Reset Password',
        html: mail
    };
    try {
        yield transport.sendMail(message);
        return { status: "ok" };
    }
    catch (error) {
        return { status: "failed", message: error === null || error === void 0 ? void 0 : error.message };
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
