import { IAdminDependencies } from "../../../application/interface/admin/IDependencies";
import { blockUnblockUser } from "./blockUnblockUser";
import { findAllUsersController } from "./findAllUsers";

export const controllers = (dependencies: IAdminDependencies) => {

    return {

        findAllUsers: findAllUsersController(dependencies),
        blockUnblockUser: blockUnblockUser(dependencies)
    }
}