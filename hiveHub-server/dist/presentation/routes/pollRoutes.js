"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pollRoutes = void 0;
const express_1 = require("express");
const currentUser_1 = require("../middlewares/currentUser");
const polls_1 = require("../controllers/polls");
const fetchAllPolls_1 = require("../controllers/polls/fetchAllPolls");
const pollRoutes = (dependencies) => {
    const { createPoll, fetchAllPolls, voteController, deletePoll, editPoll } = (0, polls_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router.route('/create-poll').post(currentUser_1.currentUser, createPoll);
    router.route('/fetch-all-polls').get(currentUser_1.currentUser, fetchAllPolls);
    router.route('/poll-vote').put(currentUser_1.currentUser, voteController);
    router.route('/delete-poll').delete(currentUser_1.currentUser, deletePoll);
    router.route('/edit-poll').put(currentUser_1.currentUser, editPoll);
    router.route('/fetch-user-polls/:id').get(currentUser_1.currentUser, fetchAllPolls_1.fetchUserPolls);
    return router;
};
exports.pollRoutes = pollRoutes;
