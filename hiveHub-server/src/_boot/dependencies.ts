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



export const authDependencies: IDependencies = { repositories, useCases }

export const postDependencies: IPostDependencies = { postRepositories, postUseCases }

export const networkDependencies: INetworkDependencies = { networkRepositories, networkUseCases }

export const commentsDependencies: ICommentsDependencies = { commentsRepositories, commentsUseCases }

export const likesDependencies: ILikesDependencies = { likesRepositories, likesUseCases }

export const reportsDependencies: IReportsDependencies = { reportsRepositories, reportsUseCases }


