import { StoryEntity } from "../../entities/storyEntity";

export interface ICreateStoryUseCase {

    execute: (data: StoryEntity) => Promise<StoryEntity | null>
}