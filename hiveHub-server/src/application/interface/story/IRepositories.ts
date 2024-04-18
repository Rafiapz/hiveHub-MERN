import { UserEntity } from "../../../domain/entities";
import { StoryEntity } from "../../../domain/entities/storyEntity";

export interface IRepositories {
    createStory: (data: StoryEntity) => Promise<StoryEntity | null>;
    findAllStories: (userId: any) => any;
    deleteStory: (id: any) => any
}