"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user");
const passport_1 = __importDefault(require("passport"));
const currentUser_1 = require("../middlewares/currentUser");
const multer_1 = require("../../_lib/multer");
const bcrypt_1 = require("../../_lib/bcrypt");
const authRoutes = (dependencies) => {
    const { signup, verify, login, updateOtp, googleAuth, logout, fetchUser, editProfile, findAllUsers, resetPasswordVerification, changePassword, fetchOtherUser, editEmailVerifyandUpdate, blockOtherUser, unblockOtherUser, isUserBlockedController } = (0, user_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router.use(passport_1.default.initialize());
    router.use(passport_1.default.session());
    router.route("/signup").post(signup);
    router.route("/otp-verification").post(verify);
    router.route("/login").post(login);
    router.route("/fetch-user").get(fetchUser);
    router.route("/resend-otp").get(updateOtp);
    router.route("/google").post(googleAuth);
    router.route("/logout").get(currentUser_1.currentUser, logout);
    router.route("/edit-user-images/:type").post(currentUser_1.currentUser, multer_1.uploadSingleFile, editProfile);
    router.route("/edit-user-profile").post(currentUser_1.currentUser, editProfile);
    router.route("/verify-email-update-otp").put(currentUser_1.currentUser, editEmailVerifyandUpdate);
    router.route("/edit-user-password").post(bcrypt_1.validatePassword, currentUser_1.currentUser, editProfile);
    router.route("/fetch-all-users").get(currentUser_1.currentUser, findAllUsers);
    router.route("/send-confirmation-email-reset-password/:email").get(resetPasswordVerification);
    router.route("/change-password").post(changePassword);
    router.route('/block-another-user').put(currentUser_1.currentUser, blockOtherUser);
    router.route('/unblock-another-user').put(currentUser_1.currentUser, unblockOtherUser);
    router.route('/is-user-blocked/:id').get(currentUser_1.currentUser, isUserBlockedController);
    router.route("/fetch-other-user").get(currentUser_1.currentUser, fetchOtherUser);
    router.get("/failure", (req, res) => {
        console.log("called failure");
        res.send("failure");
    });
    return router;
};
exports.authRoutes = authRoutes;