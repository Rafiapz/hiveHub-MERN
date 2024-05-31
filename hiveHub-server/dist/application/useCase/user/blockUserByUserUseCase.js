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
exports.unblockUserByUserUseCase = exports.blockUserByUserUseCase = void 0;
const blockUserByUserUseCase = (dependencies) => {
    const { repositories: { blockUserByUser } } = dependencies;
    return {
        execute: (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield blockUserByUser(data);
            }
            catch (error) {
                throw new Error(error);
            }
        })
    };
};
exports.blockUserByUserUseCase = blockUserByUserUseCase;
const unblockUserByUserUseCase = (dependencies) => {
    const { repositories: { unblockUserByUser } } = dependencies;
    return {
        execute: (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield unblockUserByUser(data);
            }
            catch (error) {
                throw new Error(error);
            }
        })
    };
};
exports.unblockUserByUserUseCase = unblockUserByUserUseCase;
