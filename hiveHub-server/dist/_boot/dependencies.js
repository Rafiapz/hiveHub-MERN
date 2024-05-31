"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pollsDependencies = exports.notificationsDependencies = exports.storyDependencies = exports.adminDependencies = exports.chatsDependencies = exports.reportsDependencies = exports.likesDependencies = exports.commentsDependencies = exports.networkDependencies = exports.postDependencies = exports.authDependencies = void 0;
const useCases = __importStar(require("../application/useCase/user"));
const repositories = __importStar(require("../infrastructure/database/repositories/user"));
const postUseCases = __importStar(require("../application/useCase/posts"));
const postRepositories = __importStar(require("../infrastructure/database/repositories/posts"));
const networkUseCases = __importStar(require("../application/useCase/networks"));
const networkRepositories = __importStar(require("../infrastructure/database/repositories/networks"));
const commentsUseCases = __importStar(require("../application/useCase/comments"));
const commentsRepositories = __importStar(require("../infrastructure/database/repositories/comments"));
const likesUseCases = __importStar(require("../application/useCase/likes"));
const likesRepositories = __importStar(require("../infrastructure/database/repositories/likes"));
const reportsUseCases = __importStar(require("../application/useCase/reports"));
const reportsRepositories = __importStar(require("../infrastructure/database/repositories/reports"));
const chatsUseCases = __importStar(require("../application/useCase/chats"));
const chatsRepositories = __importStar(require("../infrastructure/database/repositories/chats"));
const adminUseCases = __importStar(require("../application/useCase/admin"));
const adminRepositories = __importStar(require("../infrastructure/database/repositories/admin"));
const storyUseCases = __importStar(require("../application/useCase/story"));
const storyRepositories = __importStar(require("../infrastructure/database/repositories/story"));
const notificationsUseCases = __importStar(require("../application/useCase/notifications"));
const notificationsRepositories = __importStar(require("../infrastructure/database/repositories/notifications"));
const pollsUseCases = __importStar(require("../application/useCase/polls"));
const pollsRepositories = __importStar(require("../infrastructure/database/repositories/polls"));
exports.authDependencies = { repositories, useCases };
exports.postDependencies = { postRepositories, postUseCases };
exports.networkDependencies = { networkRepositories, networkUseCases };
exports.commentsDependencies = { commentsRepositories, commentsUseCases };
exports.likesDependencies = { likesRepositories, likesUseCases };
exports.reportsDependencies = { reportsRepositories, reportsUseCases };
exports.chatsDependencies = { chatsRepositories, chatsUseCases };
exports.adminDependencies = { adminRepositories, adminUseCases };
exports.storyDependencies = { storyRepositories, storyUseCases };
exports.notificationsDependencies = { notificationsRepositories, notificationsUseCases };
exports.pollsDependencies = { pollsRepositories, pollsUseCases };
