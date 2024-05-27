import { getObjectSignedUrl } from "../../../_lib/s3";
import { IPostDependencies } from "../../../application/interface/posts/IDependencies";
import { Request, Response, NextFunction } from "express";

export const fetchAllposts = (dependencies: IPostDependencies) => {
    const {
        postUseCases: { findAllPostsUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        try {
            const user = req?.user;
            const userId = (user as any)?.id;
            const pageSize = 2;
            const pageNumber: any = req?.query?.page;

            const skip = (pageNumber - 1) * pageSize;
            const limit = pageSize;

            const data = {
                userId,
                skip,
                limit,
            };

            const { posts, likes } = await findAllPostsUseCase(dependencies).execute(data);

            for (let post of posts) {
                post.media.path = await getObjectSignedUrl(post.media.path);
            }

            res.status(200).json({ status: "ok", message: "success", data: { posts, likes } });
        } catch (error: any) {
            res.status(error?.status || 500).json({ status: "failed", message: error.message });
        }
    };
};
