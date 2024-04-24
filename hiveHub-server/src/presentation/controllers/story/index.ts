import { IStoryDependencies } from "../../../application/interface/story/IDependencies";
import { createStoryController } from "./createStory";
import { deleteStoryController } from "./delteStory";
import { findAllStoriesController } from "./findAllStories";
import { findStoryByIdController } from "./findStoryById";
import { storySeenController } from "./storySeen";

export const controllers = (dependencies: IStoryDependencies) => {

    return {
        createStory: createStoryController(dependencies),
        findAllStories: findAllStoriesController(dependencies),
        deleteStory: deleteStoryController(dependencies),
        findStoryByid: findStoryByIdController(dependencies),
        storySeen: storySeenController(dependencies)
    }
}