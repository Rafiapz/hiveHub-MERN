import { INetworkDependencies } from "../../../application/interface/network/IDependencies"
import { coneectionRequestController } from "./connectionRequest"

export const controllers=(dependencies:INetworkDependencies)=>{

    return {
       connectionRequest:coneectionRequestController(dependencies)
    }
}