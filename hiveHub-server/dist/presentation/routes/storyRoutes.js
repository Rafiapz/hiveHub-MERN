"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storyRoutes = void 0;
const express_1 = require("express");
const story_1 = require("../controllers/story");
const currentUser_1 = require("../middlewares/currentUser");
const multer_1 = require("../../_lib/multer");
const storyRoutes = (dependencies) => {
    const { createStory, findAllStories, deleteStory, findStoryByid, storySeen } = (0, story_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router.route('/create-story/:type').post(currentUser_1.currentUser, multer_1.uploadSingleFile, createStory);
    router.route('/fetch-all-stories/:userId').get(currentUser_1.currentUser, findAllStories);
    router.route('/delete-story').put(currentUser_1.currentUser, deleteStory);
    router.route('/fetch-others-story/:userId').get(currentUser_1.currentUser, findStoryByid);
    router.route('/story-seen').put(currentUser_1.currentUser, storySeen);
    return router;
};
exports.storyRoutes = storyRoutes;
