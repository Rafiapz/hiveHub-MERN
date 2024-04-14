
import { Router } from 'express'

import { currentUser } from '../middlewares/currentUser'
import { INetworkDependencies } from '../../application/interface/network/IDependencies'
import { IChatsDependencies } from '../../application/interface/chats/IDependencies'
import { controllers } from '../controllers/chats'



export const chatRoutes = (dependencies: IChatsDependencies) => {

    const { createConvesation, createChat, fetchConversations, fetchChats } = controllers(dependencies)

    const router = Router()

    router.route('/create-conversation').post(createConvesation)

    router.route('/fetch-conversations/:userId').get(fetchConversations)

    router.route('/create-message').post(createChat)

    router.route('/fetch-messages/:id').get(fetchChats)




    return router
}