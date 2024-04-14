import { Server } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import cors from 'cors'

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

            socket.on('join_room', (data) => {
                socket.join(data)
            })


            socket.on('send_message', (data: any) => {
                console.log(data);

                socket.broadcast.emit('recieve_message', data)

            });

            socket.on('disconnect', () => {

            })

        })



    } catch (error: any) {
        console.log(error);

    }
}