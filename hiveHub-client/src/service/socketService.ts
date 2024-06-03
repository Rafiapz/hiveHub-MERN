import io from 'socket.io-client';

class SocketService {
    socket;

    constructor() {
        this.socket = io("http://localhost:7700", {
            path: '/socket.io',
            transports: ['websocket'],
            secure: true,
            withCredentials: true
        });
    }

}

const socketService = new SocketService();
export default socketService;