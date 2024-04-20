import { StoryEntity } from "../../entities/storyEntity";

export interface IFindStoryByIdUseCase {
    execute: (id: any) => Promise<StoryEntity[] | []>
}