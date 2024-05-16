import { Router } from 'express'
import { currentUser } from '../middlewares/currentUser'
import { controllers } from '../controllers/polls';
import { IPollsDependencies } from '../../application/interface/polls/IDependencies';
import { fetchUserPolls } from '../controllers/polls/fetchAllPolls';




export const pollRoutes = (dependencies: IPollsDependencies) => {

    const {
        createPoll,
        fetchAllPolls,
        voteController,
        deletePoll,
        editPoll
    } = controllers(dependencies);

    const router = Router()


    router.route('/create-poll').post(currentUser, createPoll)

    router.route('/fetch-all-polls').get(currentUser, fetchAllPolls)

    router.route('/poll-vote').put(currentUser, voteController)

    router.route('/delete-poll').delete(currentUser, deletePoll)

    router.route('/edit-poll').put(currentUser, editPoll)

    router.route('/fetch-user-polls/:id').get(currentUser, fetchUserPolls)



    return router
}