const express =  require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL)                                                //("mongodb://127.0.0.1:27017/Chat-app-mern-redux")                               
.then(()=>{
console.log("DB is Connected");
})
.catch((err)=>{
   console.log(err , 'DB is not connected');
   
});


const app = express();
app.use(cors({origin:'*',credentials:true}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes); 

// const server = http.createServer(app);
const PORT = 8080; // assigning port 
const server = app.listen(PORT,()=>{  // calling server 
  console.log(`Server is Connected At http://localhost:${PORT}`);  
});


const io = new Server(server, {        // create a new server instance binding with existing server express 
  cors: {                              // Enable cors 
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;  // reade jwt token sent by client 
  // console.log(' Token received from client:', token);
  if (!token) return next(new Error('No token'));   // if tokr\en is missing reject the connection 

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);  // verifying the token 
    // console.log('Token verified. User:', user);
    socket.user = user; // { id: ... }
    next();
  } catch (err) {
    console.error('Invalid JWT:', err.message);
    next(new Error('Invalid token'));
  }
});

const userSocketMap = {};   // keep track the connected user 
io.on('connection', (socket) => {   // listen new socket connection 
  console.log('Client connected:', socket.id);  
  
  socket.on('joinRoom', ({ senderId, receiverId }) => {
    userSocketMap[senderId] = socket.id;   //save sender id 
    console.log('User joined:', senderId, 'Socket:', socket.id);

    const room = [senderId, receiverId].sort().join('_');  // create a room for both sorting user id 
    socket.join(room);  // join the room 
  });

  socket.on('sendMessage', ({ senderId, receiverId, text }) => {  // listen send message from the clinet 
    // const room = [senderId, receiverId].sort().join('_');
    const msg = { sender: senderId, receiver: receiverId, text, timestamp: new Date() };  // msg with send receiver text time stamp
    const receiverSocketId = userSocketMap[receiverId];  // finds the receiver socket id using userSocketMap 
     if (receiverSocketId) {
      io.to(receiverSocketId).emit('receiveMessage', msg); // recevier get msg it emit 
      console.log('Sent to receiver:', receiverSocketId);             
    }
    // socket.to(room).emit('receiveMessage', msg);
  });
    //not using rooms here, only direct user-to-user mapping.
  
    socket.on('disconnect', () => {     //  handle user disconnect remove socket.id 
    console.log('Client disconnected' , socket.id);
    for (const userId in userSocketMap) {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
        break;
      }
    }
  });
});



