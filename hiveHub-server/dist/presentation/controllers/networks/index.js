"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const connectionRequest_1 = require("./connectionRequest");
const fetchAllnetworks_1 = require("./fetchAllnetworks");
const fetchFollowers_1 = require("./fetchFollowers");
const fetchFollowing_1 = require("./fetchFollowing");
const searchUser_1 = require("./searchUser");
const unfollow_1 = require("./unfollow");
const controllers = (dependencies, notificationDependencies) => {
    return {
        connectionRequest: (0, connectionRequest_1.coneectionRequestController)(dependencies, notificationDependencies),
        fetchAllNetworks: (0, fetchAllnetworks_1.fetchAllNetworksController)(dependencies),
        fetchFollowing: (0, fetchFollowing_1.fetchFollowingController)(dependencies),
        fetchFollowers: (0, fetchFollowers_1.fetchFollowersController)(dependencies),
        unfollow: (0, unfollow_1.unfollowController)(dependencies),
        searchUser: (0, searchUser_1.searchUserController)(dependencies)
    };
};
exports.controllers = controllers;
