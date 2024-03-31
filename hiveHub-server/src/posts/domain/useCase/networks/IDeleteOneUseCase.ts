import { DeleteResult } from "mongodb";

export interface IDeleteOneUseCase {

    execute: (id: any) => Promise<DeleteResult | null>
}