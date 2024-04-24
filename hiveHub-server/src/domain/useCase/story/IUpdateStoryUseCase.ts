import { StoryEntity } from "../../entities/storyEntity";

export interface IUpdateStoryUseCase {
    execute: (storyId: any,userId:any) => Promise<StoryEntity | null>
}