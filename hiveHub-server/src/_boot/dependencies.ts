import { IDependencies } from '../application/interface/user/IDependencies'
import * as useCases from '../application/useCase/user'
import * as repositories from '../infrastructure/database/repositories/user'

import { IPostDependencies } from '../application/interface/posts/IDependencies'
import * as postUseCases from '../application/useCase/posts'
import * as postRepositories from '../infrastructure/database/repositories/posts'

import { INetworkDependencies } from '../application/interface/network/IDependencies'
import * as networkUseCases from '../application/useCase/networks'
import * as networkRepositories from '../infrastructure/database/repositories/networks'

import { ICommentsDependencies } from '../application/interface/comments/IDependencies'
import * as commentsUseCases from '../application/useCase/comments'
import * as commentsRepositories from '../infrastructure/database/repositories/comments'

import { ILikesDependencies } from '../application/interface/likes/IDependencies'
import * as likesUseCases from '../application/useCase/likes'
import * as likesRepositories from '../infrastructure/database/repositories/likes'

import { IReportsDependencies } from '../application/interface/reports/IDependencies'
import * as reportsUseCases from '../application/useCase/reports'
import * as reportsRepositories from '../infrastructure/database/repositories/reports'

import { IChatsDependencies } from '../application/interface/chats/IDependencies'
import * as chatsUseCases from '../application/useCase/chats'
import * as chatsRepositories from '../infrastructure/database/repositories/chats'

import { IAdminDependencies } from '../application/interface/admin/IDependencies'
import * as adminUseCases from '../application/useCase/admin'
import * as adminRepositories from '../infrastructure/database/repositories/admin'

import { IStoryDependencies } from '../application/interface/story/IDependencies'
import * as storyUseCases from '../application/useCase/story'
import * as storyRepositories from '../infrastructure/database/repositories/story'


import { INotificationsDependencies } from '../application/interface/notifications/IDependencies'
import * as notificationsUseCases from '../application/useCase/notifications'
import * as notificationsRepositories from '../infrastructure/database/repositories/notifications'

import { IPollsDependencies } from '../application/interface/polls/IDependencies'
import * as pollsUseCases from '../application/useCase/polls'
import * as pollsRepositories from '../infrastructure/database/repositories/polls'




export const authDependencies: IDependencies = { repositories, useCases }

export const postDependencies: IPostDependencies = { postRepositories, postUseCases }

export const networkDependencies: INetworkDependencies = { networkRepositories, networkUseCases }

export const commentsDependencies: ICommentsDependencies = { commentsRepositories, commentsUseCases }

export const likesDependencies: ILikesDependencies = { likesRepositories, likesUseCases }

export const reportsDependencies: IReportsDependencies = { reportsRepositories, reportsUseCases }

export const chatsDependencies: IChatsDependencies = { chatsRepositories, chatsUseCases }

export const adminDependencies: IAdminDependencies = { adminRepositories, adminUseCases }

export const storyDependencies: IStoryDependencies = { storyRepositories, storyUseCases }

export const notificationsDependencies: INotificationsDependencies = { notificationsRepositories, notificationsUseCases }

export const pollsDependencies: IPollsDependencies = { pollsRepositories, pollsUseCases }