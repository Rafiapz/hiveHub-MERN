import { IDependencies } from "../../application/interfaces/IDependencies";
import { fetchUserController } from "./fetchUser";
import { googleAuthController } from "./googleAuth";
import { loginController } from "./login";
import { logoutController } from "./logout";
import { signupController } from "./signup";
import { updateOtpController } from "./updateUser";
import { verifyController } from "./verifyAccount";



export const controllers=(dependancies:IDependencies)=>{

    return {
        signup:signupController(dependancies),
        verify:verifyController(dependancies),
        login:loginController(dependancies),
        updateOtp:updateOtpController(dependancies),
        googleAuth:googleAuthController(dependancies),
        logout:logoutController(),
        fetchUser:fetchUserController(dependancies)
    }
}