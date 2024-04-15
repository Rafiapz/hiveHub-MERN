import { Server } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'


let users: any = []

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


            socket.on('sendMessage', ({ senderId, receiverId, message }) => {

                const user = getUser(receiverId);

                if (user) {
                    io.to(user.socketId).emit("recieveMessage", {
                        senderId,
                        message,
                    });

                }
            });

            socket.on("disconnect", () => {
                removeUser(socket.id);
                io.emit("getUsers", users);
            });

            socket.on('callUser', ({ userToCall, signalData, from, name }: any) => {
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