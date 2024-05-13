import { IPollsDependencies } from "../../../application/interface/polls/IDependencies";
import { createPollController } from "./createPoll";
import { deletePollController } from "./deletePoll";
import { fetchAllPollsController } from "./fetchAllPolls";
import { voteController } from "./voteController";

export const controllers = (dependencies: IPollsDependencies) => {

    return {

        createPoll: createPollController(dependencies),
        fetchAllPolls: fetchAllPollsController(dependencies),
        voteController: voteController(dependencies),
        deletePoll: deletePollController(dependencies)
    }
}