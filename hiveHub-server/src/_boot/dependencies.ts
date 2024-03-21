import {IDependencies } from '../auth/application/interfaces/IDependencies'
import * as useCases from '../auth/application/useCases'
import * as repositories from '../auth/infrastructure/database/repositories'

import{IPostDependencies} from '../posts/application/interface/IDependencies'
import * as postUseCases from '../posts/application/useCase'
import * as postRepositories from '../posts/infrastructure/database/repositories'



export const authDependencies:IDependencies={repositories,useCases}

export const postDependencies:IPostDependencies={postRepositories,postUseCases}

