import { UserEntity } from "../../../domain/entities";
import { StoryEntity } from "../../../domain/entities/storyEntity";

export interface IRepositories {
    createStory: (data: StoryEntity) => Promise<StoryEntity | null>;
    findAllStories: (userId: any) => any;
    deleteStory: (id: any) => any;
    findStoryById: (id: any) => Promise<StoryEntity[] | []>;
    updateStory: (storyId: any, userId: any) => Promise<StoryEntity | null>
}