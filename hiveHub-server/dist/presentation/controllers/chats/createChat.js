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
exports.createChatController = void 0;
const createChatController = (dependencies) => {
    const { chatsUseCases: { createChatUseCase } } = dependencies;
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g;
        try {
            const params = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.type;
            let data = {
                message: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.message,
                senderId: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.senderId,
                conversationId: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.conversationId,
            };
            if (((_e = req === null || req === void 0 ? void 0 : req.file) === null || _e === void 0 ? void 0 : _e.filename) && params === 'image') {
                const path = `http://localhost:7700/posts/${(_f = req === null || req === void 0 ? void 0 : req.file) === null || _f === void 0 ? void 0 : _f.filename}`;
                data.image = path;
            }
            if (params === 'video') {
                const path = `http://localhost:7700/posts/${(_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.fileName}`;
                data.video = path;
            }
            const result = yield createChatUseCase(dependencies).execute(data);
            res.status(200).json({ status: 'ok', data: result });
        }
        catch (error) {
            res.json({ status: 'failed', message: error.message });
        }
    });
};
exports.createChatController = createChatController;
