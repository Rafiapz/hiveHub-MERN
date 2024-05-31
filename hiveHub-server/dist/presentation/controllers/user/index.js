"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const blockOtherUser_1 = require("./blockOtherUser");
const editUserProfile_1 = require("./editUserProfile");
const fetchUser_1 = require("./fetchUser");
const findAllUsers_1 = require("./findAllUsers");
const googleAuth_1 = require("./googleAuth");
const login_1 = require("./login");
const logout_1 = require("./logout");
const resetPassword_1 = require("./resetPassword");
const signup_1 = require("./signup");
const updateUser_1 = require("./updateUser");
const verifyAccount_1 = require("./verifyAccount");
const controllers = (dependencies) => {
    return {
        signup: (0, signup_1.signupController)(dependencies),
        verify: (0, verifyAccount_1.verifyController)(dependencies),
        login: (0, login_1.loginController)(dependencies),
        updateOtp: (0, updateUser_1.updateOtpController)(dependencies),
        googleAuth: (0, googleAuth_1.googleAuthController)(dependencies),
        logout: (0, logout_1.logoutController)(),
        fetchUser: (0, fetchUser_1.fetchUserController)(dependencies),
        editProfile: (0, editUserProfile_1.editUserProfile)(dependencies),
        findAllUsers: (0, findAllUsers_1.findAllUsersController)(dependencies),
        resetPasswordVerification: (0, resetPassword_1.resetPasswordVerificationController)(dependencies),
        changePassword: (0, resetPassword_1.changePasswordController)(dependencies),
        fetchOtherUser: (0, fetchUser_1.fetchOtherUserController)(dependencies),
        editEmailVerifyandUpdate: (0, editUserProfile_1.editUserEmailController)(dependencies),
        blockOtherUser: (0, blockOtherUser_1.blockOtherUserController)(dependencies),
        unblockOtherUser: (0, blockOtherUser_1.unblockOtherUserController)(dependencies),
        isUserBlockedController: (0, blockOtherUser_1.isUserBlockedController)(dependencies)
    };
};
exports.controllers = controllers;
