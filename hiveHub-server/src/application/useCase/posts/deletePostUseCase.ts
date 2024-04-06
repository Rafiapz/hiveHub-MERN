import { ObjectId } from "mongodb";
import { IPostDependencies } from "../../interface/posts/IDependencies";

export const deletePostUseCase = (dependencies: IPostDependencies) => {

    const { postRepositories: { deletePost } } = dependencies
    return {



        execute: (data: { _id: string }) => {

            try {
                return deletePost(data)
            } catch (error: any) {
                throw new Error(error.message)
            }

        }

    }
}