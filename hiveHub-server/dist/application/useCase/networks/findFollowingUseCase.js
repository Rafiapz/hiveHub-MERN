"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFollowingUseCase = void 0;
const findFollowingUseCase = (dependencies) => {
    const { networkRepositories: { findFollowing } } = dependencies;
    return {
        execute: (userId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield findFollowing(userId);
            }
            catch (error) {
                throw new Error(error);
            }
        })
    };
};
exports.findFollowingUseCase = findFollowingUseCase;
