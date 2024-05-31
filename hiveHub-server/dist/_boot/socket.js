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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocketIO = exports.getSocketServer = exports.getUser = exports.removeUser = exports.getOnlineUsers = void 0;
const socket_io_1 = require("socket.io");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
let ioInstance = null;
const uploadsDir = './public/posts';
let users = [];
const getOnlineUsers = () => {
    return users;
};
exports.getOnlineUsers = getOnlineUsers;
const addUser = (userId, socketId) => {
    let already;
    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === userId) {
            already = true;
            break;
        }
    }
    if (!already) {
        users.push({ userId, socketId });
    }
};
const removeUser = (userId) => {
    users = users.filter((user) => user.userId !== userId);
};
exports.removeUser = removeUser;
const getUser = (userId) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].userId == userId) {
            return users[i];
        }
    }
};
exports.getUser = getUser;
const getSocketServer = () => {
    return ioInstance;
};
exports.getSocketServer = getSocketServer;
const initializeSocketIO = (server) => {
    try {
        const io = new socket_io_1.Server(server, {
            cors: {
                origin: ['https://hivehub.shop', 'https://www.hivehub.shop'],
                methods: ['GET', 'POST'],
            }
        });
        ioInstance = io;
        io.on('connection', (socket) => {
            console.log('caled con');
            socket.on("addUser", (userId) => {
                if (userId) {
                    addUser(userId, socket.id);
                    io.emit("getUsers", users);
                }
            });
            let fileData = [];
            let fileName;
            socket.on('video-chunk', (data) => {
                fileData[data.offset] = data.chunk;
            });
            socket.on('video-transfer-complete', ({ senderId, receiverId, conversationId }) => {
                const filteredFileData = fileData.filter((chunk) => chunk !== undefined);
                const fileBuffer = Buffer.concat(filteredFileData);
                const timestamp = Date.now();
                fileName = `video-${timestamp}.mp4`;
                const filePath = path_1.default.join(uploadsDir, fileName);
                fs_1.default.writeFile(filePath, fileBuffer, (err) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err) {
                        console.error('Error saving video file:', err);
                        socket.emit('video-upload-error', 'Error saving video file');
                    }
                    else {
                        console.log('Video file saved successfully');
                        try {
                            const form = new FormData();
                            form.append('fileName', fileName || '');
                            form.append('senderId', senderId);
                            form.append('conversationId', conversationId);
                            form.append('from', 'socket');
                            yield axios_1.default.post('http://localhost:7700/chats/send-video/video', form, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            });
                            io.emit('upload-comepleted', { conversationId });
                        }
                        catch (error) {
                            const sender = (0, exports.getUser)(senderId);
                            io.to(sender === null || sender === void 0 ? void 0 : sender.socketId).emit('failed to upload');
                            return;
                        }
                        const user = (0, exports.getUser)(receiverId);
                        if (user) {
                            io.to(user === null || user === void 0 ? void 0 : user.socketId).emit('video-upload-success', { fileName, senderId });
                        }
                    }
                }));
            });
            socket.on('sendMessage', ({ senderId, receiverId, message }) => {
                const user = (0, exports.getUser)(receiverId);
                if (user) {
                    io.to(user.socketId).emit("recieveMessage", {
                        senderId,
                        message,
                    });
                }
                else {
                    // console.log('user not found , message', receiverId);
                }
            });
            socket.on('typing', (data) => {
                const user = (0, exports.getUser)(data === null || data === void 0 ? void 0 : data.receiverId);
                if (user) {
                    io.to(user.socketId).emit('typing', { data: 'Typing...', senderId: data === null || data === void 0 ? void 0 : data.senderId });
                }
            });
            socket.on('image', (data) => {
                console.log('image called');
                const user = (0, exports.getUser)(data === null || data === void 0 ? void 0 : data.receiverId);
                if (user) {
                    io.to(user.socketId).emit('image', { data: data === null || data === void 0 ? void 0 : data.data, senderId: data === null || data === void 0 ? void 0 : data.senderId });
                }
                else {
                    // console.log('user not found');
                }
            });
            socket.on('video', (data) => {
                const user = (0, exports.getUser)(data === null || data === void 0 ? void 0 : data.receiverId);
                if (user) {
                    io.to(user.socketId).emit('video', data);
                }
            });
            socket.on('sendNotification', (data) => {
                const user = (0, exports.getUser)(data === null || data === void 0 ? void 0 : data.receiverId);
                console.log(user, 'not');
                if (user) {
                    console.log('emmited');
                    io.to(user.socketId).emit('getNotifiation', data);
                }
            });
            socket.on('sendNotificationtoAll', (data) => {
                io.emit('getNotifiation', data);
            });
            socket.on("disconnect", () => {
                // removeUser(socket.id);
                // io.emit("getUsers", users);
            });
            socket.on('callUser', ({ userToCall, signalData, from, name }) => {
                console.log('clled');
                io.to(userToCall).emit('callUser', { signal: signalData, from, name });
            });
            socket.on('answerCall', (data) => {
                io.to(data.to).emit('callAccepted', data.signal);
            });
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.initializeSocketIO = initializeSocketIO;
