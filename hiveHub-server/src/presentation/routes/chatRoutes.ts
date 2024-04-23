
import { Router } from 'express'

import { currentUser } from '../middlewares/currentUser'
import { INetworkDependencies } from '../../application/interface/network/IDependencies'
import { IChatsDependencies } from '../../application/interface/chats/IDependencies'
import { controllers } from '../controllers/chats'
import { uploadSingleFile } from '../../_lib/multer'



export const chatRoutes = (dependencies: IChatsDependencies) => {

    const { createConvesation, createChat, fetchConversations, fetchChats } = controllers(dependencies)

    const router = Router()

    router.route('/create-conversation').post(createConvesation)

    router.route('/fetch-conversations/:userId').get(fetchConversations)

    router.route('/create-message/:type').post(uploadSingleFile, createChat)

    router.route('/fetch-messages/:id').get(fetchChats)

    router.route('/send-video/:type').post(createChat)




    return router
}