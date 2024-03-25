import {Router} from 'express'
import { controllers } from '../../controllers/networks'
import { currentUser } from '../../middlewares/currentUser'
import { INetworkDependencies } from '../../../application/interface/network/IDependencies'



export const networksRoutes=(dependencies:INetworkDependencies)=>{    
        
    const {connectionRequest}=controllers(dependencies)

    const router=Router()

    router.route('/connection-request/:id').post(currentUser,connectionRequest)

  
    

    

    return router
}