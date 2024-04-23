import { Server } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import fs from 'fs';
import path from 'path';
import axios from 'axios';

interface VideoChunkData {
    chunk: Uint8Array;
    offset: number;
}


const uploadsDir = './public/posts'


let users: any = []

export const getOnlineUsers = () => {

    return users
}

const addUser = (userId: any, socketId: any) => {

    let already

    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === userId) {
            already = true;
            break
        }
    }

    if (!already) {
        users.push({ userId, socketId });
    }

};

const removeUser = (socketId: any) => {
    users = users.filter((user: any) => user.socketId !== socketId);
};

const getUser = (userId: any) => {

    for (let i = 0; i < users.length; i++) {

        if (users[i].userId === userId) {
            return users[i]
        }
    }


};

export const initializeSocketIO = (server: Server) => {

    try {

        const allowedOrgins = ['http://192.168.1.5:5173', 'http://localhost:5173']

        const io = new SocketIOServer(server, {
            cors: {
                origin: allowedOrgins,
                methods: ['GET', 'POST'],
            }
        });




        io.on('connection', (socket: Socket) => {

            socket.on("addUser", (userId) => {
                addUser(userId, socket.id);
                io.emit("getUsers", users);
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

                            await axios.post('http://localhost:7700/chats/send-video/video', form, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })
                            io.emit('upload-comepleted', { conversationId })
                        } catch (error) {
                            const sender = getUser(senderId)
                            io.to(sender?.socketId).emit('failed to upload')
                            return
                        }
                        const user = getUser(receiverId);

                        if (user) {
                            io.to(user?.socketId).emit('video-upload-success', { fileName, senderId });

                        }

                    }
                });
            });

            socket.on('sendMessage', ({ senderId, receiverId, message }) => {
                const user = getUser(receiverId);

                if (user) {
                    io.to(user.socketId).emit("recieveMessage", {
                        senderId,
                        message,
                    });

                }
            });

            socket.on('image', (data) => {

                const user = getUser(data?.receiverId);

                if (user) {
                    io.to(user.socketId).emit('image', data);
                }

            });
            socket.on('video', (data) => {

                console.log('viedo called', data);
                const user = getUser(data?.receiverId);

                if (user) {
                    io.to(user.socketId).emit('video', data);
                }

            });

            socket.on("disconnect", () => {
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