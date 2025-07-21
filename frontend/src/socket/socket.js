import { io } from 'socket.io-client';
 const token =  localStorage.getItem('token');

const socket = io('http://localhost:8080',{
    withCredentials: true,
    auth: {
    token: token || '',
    },
    autoConnect: false,
    withCredentials: true,
   transports: ['websocket'],
}); // your backend URL

export default socket;