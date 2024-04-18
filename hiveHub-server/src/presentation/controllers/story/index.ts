import { IStoryDependencies } from "../../../application/interface/story/IDependencies";
import { createStoryController } from "./createStory";
import { deleteStoryController } from "./delteStory";
import { findAllStoriesController } from "./findAllStories";

export const controllers = (dependencies: IStoryDependencies) => {

    return {
        createStory: createStoryController(dependencies),
        findAllStories: findAllStoriesController(dependencies),
        deleteStory: deleteStoryController(dependencies)
    }
}