import { UserEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const updateOneUserUseCase=(dependencies:IDependencies)=>{

    const {repositories:{updateOne}}=dependencies

    return {
        execute:async (query:{email:string},data:any)=>{
            return await updateOne(query,data)
        }
    }
}