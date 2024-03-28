import { IDependencies } from "../interfaces/IDependencies";

export const findAllUsersUseCase=(dependencies:IDependencies)=>{

    const {repositories:{findAllUsers}}=dependencies

    return {

        execute:async()=>{
            try {

                return await findAllUsers()
                
            } catch (error:any) {
                throw new error(error)
            }
        }
    }
}