import { INetworkDependencies } from "../../../application/interface/network/IDependencies"
import { coneectionRequestController } from "./connectionRequest"
import { fetchAllNetworksController } from "./fetchAllnetworks"

export const controllers=(dependencies:INetworkDependencies)=>{

    return {
       connectionRequest:coneectionRequestController(dependencies),
       fetchAllNetworks:fetchAllNetworksController(dependencies)
    }
}