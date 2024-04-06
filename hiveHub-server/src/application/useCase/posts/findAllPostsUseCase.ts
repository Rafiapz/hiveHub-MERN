import { IPostDependencies } from "../../interface/posts/IDependencies"


export const findAllPostsUseCase = (dependencies: IPostDependencies) => {

  const { postRepositories: { findAllPosts } } = dependencies
  return {

    execute: (data: any) => {

      return findAllPosts(data)

    }

  }
}