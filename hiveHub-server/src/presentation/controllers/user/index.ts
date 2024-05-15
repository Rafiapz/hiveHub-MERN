import { IDependencies } from "../../../application/interface/user/IDependencies";
import { blockOtherUserController, isUserBlockedController, unblockOtherUserController } from "./blockOtherUser";
import { editUserEmailController, editUserProfile } from "./editUserProfile";
import { fetchOtherUserController, fetchUserController } from "./fetchUser";
import { findAllUsersController } from "./findAllUsers";
import { googleAuthController } from "./googleAuth";
import { loginController } from "./login";
import { logoutController } from "./logout";
import { changePasswordController, resetPasswordVerificationController } from "./resetPassword";
import { signupController } from "./signup";
import { updateOtpController } from "./updateUser";
import { verifyController } from "./verifyAccount";



export const controllers = (dependencies: IDependencies) => {

    return {
        signup: signupController(dependencies),
        verify: verifyController(dependencies),
        login: loginController(dependencies),
        updateOtp: updateOtpController(dependencies),
        googleAuth: googleAuthController(dependencies),
        logout: logoutController(),
        fetchUser: fetchUserController(dependencies),
        editProfile: editUserProfile(dependencies),
        findAllUsers: findAllUsersController(dependencies),
        resetPasswordVerification: resetPasswordVerificationController(dependencies),
        changePassword: changePasswordController(dependencies),
        fetchOtherUser: fetchOtherUserController(dependencies),
        editEmailVerifyandUpdate: editUserEmailController(dependencies),
        blockOtherUser: blockOtherUserController(dependencies),
        unblockOtherUser: unblockOtherUserController(dependencies),
        isUserBlockedController: isUserBlockedController(dependencies)
    }
}