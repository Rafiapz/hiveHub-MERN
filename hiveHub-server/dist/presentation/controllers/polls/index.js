"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const createPoll_1 = require("./createPoll");
const deletePoll_1 = require("./deletePoll");
const editPoll_1 = require("./editPoll");
const fetchAllPolls_1 = require("./fetchAllPolls");
const voteController_1 = require("./voteController");
const controllers = (dependencies) => {
    return {
        createPoll: (0, createPoll_1.createPollController)(dependencies),
        fetchAllPolls: (0, fetchAllPolls_1.fetchAllPollsController)(dependencies),
        voteController: (0, voteController_1.voteController)(dependencies),
        deletePoll: (0, deletePoll_1.deletePollController)(dependencies),
        editPoll: (0, editPoll_1.editPollController)(dependencies)
    };
};
exports.controllers = controllers;
