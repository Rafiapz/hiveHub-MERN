"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const createStory_1 = require("./createStory");
const delteStory_1 = require("./delteStory");
const findAllStories_1 = require("./findAllStories");
const findStoryById_1 = require("./findStoryById");
const storySeen_1 = require("./storySeen");
const controllers = (dependencies) => {
    return {
        createStory: (0, createStory_1.createStoryController)(dependencies),
        findAllStories: (0, findAllStories_1.findAllStoriesController)(dependencies),
        deleteStory: (0, delteStory_1.deleteStoryController)(dependencies),
        findStoryByid: (0, findStoryById_1.findStoryByIdController)(dependencies),
        storySeen: (0, storySeen_1.storySeenController)(dependencies)
    };
};
exports.controllers = controllers;
