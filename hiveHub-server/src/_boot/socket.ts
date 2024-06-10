import { Server } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import fs from 'fs';
import path from 'path';
import axios from 'axios';

interface VideoChunkData {
    chunk: Uint8Array;
    offset: number;
}

let ioInstance: any = null

const uploadsDir = './public/posts'


let users = new Map()

export const getOnlineUsers = () => {

    return users
}

const addUser = (userId: any, socketId: any) => {
    users.set(userId, socketId)
};

export const removeUser = (userId: any) => {
    users.delete(userId)
};

export const getUser = (userId: any) => {
    return users.get(userId)
};


export const getSocketServer = () => {
    return ioInstance
}

export const initializeSocketIO = (server: Server) => {

    try {


        const io = new SocketIOServer(server, {
            cors: {
                origin: process?.env?.FRONT_END_URL,
                methods: ['GET', 'POST'],
                credentials: true
            },
            path: '/socket.io'

        });


        ioInstance = io

        io.on('connection', (socket: Socket) => {

            socket.on("addUser", (userId: any) => {
                console.log('user added', userId);

                if (userId) {
                    addUser(userId, socket.id);
                    io.emit("getUsers", users);
                }

            });


            let fileData: Uint8Array[] = [];
            let fileName: string | undefined;

            socket.on('video-chunk', (data: VideoChunkData) => {
                fileData[data.offset] = data.chunk;
            });

            socket.on('video-transfer-complete', ({ senderId, receiverId, conversationId }: any) => {
                const filteredFileData = fileData.filter((chunk): chunk is Uint8Array => chunk !== undefined);
                const fileBuffer = Buffer.concat(filteredFileData);
                const timestamp = Date.now();
                fileName = `video-${timestamp}.mp4`;
                const filePath = path.join(uploadsDir, fileName);


                fs.writeFile(filePath, fileBuffer, async (err) => {
                    if (err) {
                        console.error('Error saving video file:', err);
                        socket.emit('video-upload-error', 'Error saving video file');
                    } else {
                        console.log('Video file saved successfully');
                        try {

                            const form = new FormData()

                            form.append('fileName', fileName || '')
                            form.append('senderId', senderId)
                            form.append('conversationId', conversationId)
                            form.append('from', 'socket')

                            await axios.post(`${process?.env.BACK_END_URL}/api/chats/send-video/video`, form, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })
                            io.emit('upload-comepleted', { conversationId })
                        } catch (error) {
                            const sender = getUser(senderId)
                            io.to(sender).emit('failed to upload')
                            return
                        }
                        const user = getUser(receiverId);

                        if (user) {
                            io.to(user).emit('video-upload-success', { fileName, senderId });

                        }

                    }
                });
            });

            socket.on('sendMessage', ({ senderId, receiverId, message }: any) => {
                const user = getUser(receiverId);
                console.log(users)
                if (user) {
                    io.to(user).emit("recieveMessage", {
                        senderId,
                        message,
                    });
                } else {

                }
            });

            socket.on('typing', (data: any) => {
                const user = getUser(data?.receiverId)
                if (user) {
                    io.to(user).emit('typing', { data: 'Typing...', senderId: data?.senderId });
                }
            })

            socket.on('image', (data: any) => {
                console.log('image called');
                const user = getUser(data?.receiverId);
                if (user) {
                    io.emit('image', { data: data?.data, senderId: data?.senderId });
                } else {
                    // console.log('user not found');

                }

            });
            socket.on('video', (data) => {

                const user = getUser(data?.receiverId);

                if (user) {
                    io.to(user).emit('video', data);
                }

            });

            socket.on('sendNotification', (data) => {

                const user = getUser(data?.receiverId);
                console.log(user, 'not');

                if (user) {
                    console.log('emmited');
                    io.to(user).emit('getNotifiation', data);
                }
            })


            socket.on('sendNotificationtoAll', (data) => {


                io.emit('getNotifiation', data);

            })



            socket.on("disconnect", () => {

                console.log('disconnected');

                removeUser(socket.id);
                io.emit("getUsers", users);
            });

            socket.on('callUser', ({ userToCall, signalData, from, name }: any) => {
                console.log('clled');

                io.to(userToCall).emit('callUser', { signal: signalData, from, name })
            })

            socket.on('answerCall', (data: any) => {
                io.to(data.to).emit('callAccepted', data.signal)
            })

        })



    } catch (error: any) {
        console.log(error);

    }
}