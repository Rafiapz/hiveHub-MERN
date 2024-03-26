import { IDependencies } from "../interfaces/IDependencies";

export const updateUserByIdUseCase=(dependencies:IDependencies)=>{

    const {repositories:{updateUserById}}=dependencies

    return {

        execute:async (id:any,data:any)=>{
            try {

                return await updateUserById(id,data)
                
            } catch (error:any) {
                throw new Error(error)
            }
        }
    }
}