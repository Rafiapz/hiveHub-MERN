import { NetworksEntity } from "../../../domain/entities";
import { INetworkDependencies } from "../../interface/network/IDependencies";

export const connectionRequestUseCase=(dependencies:INetworkDependencies)=>{

    const {connectionRepositories:{connectionRequest}}=dependencies

    return {

        execute:async (data:NetworksEntity)=>{

            try {

              return await connectionRequest(data)
                
            } catch (error:any) {
                throw new Error(error.message)
            }
        }
    }
}