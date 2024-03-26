import express from "express";
import env from "dotenv";
import bodyParser from "body-parser";
import mongoDBConnect from './database/connection.js';
import mongoose from 'mongoose';
import cors from "cors";
import * as Server from "socket.io";
import userRoutes from './routes/user.js';
import chatRoutes from './routes/chat.js';
import messageRoutes from './routes/message.js';

// const corsConfig = {
//   origin: process.env.BASE_URL,
//   credentials: true,
//   optionSuccessStatus:200
// };

const app = express();
env.config ();
const port = process.env.PORT || 8000;

// app.use(cors({
//   origin: 'http://127.0.0.1:3000'
// }));

app.use (cors ());




// app.use((req,res,next) => {
//   res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:3000/login");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });


app.use(bodyParser.json());
app.use (express.static ("public"));
app.use (bodyParser.urlencoded ({extended: true}));


app.use('/', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);


mongoose.set('strictQuery', false);
mongoDBConnect();

const server = app.listen (port , function () {
  console.log ("Server is running on port " + port);
});


const io = new Server.Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  socket.on('setup', (userData) => {
    socket.join(userData.id);
    socket.emit('connected');
  });

  socket.on('join room', (room) => {
    socket.join(room);
  });

  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageRecieve) => {
    var chat = newMessageRecieve.chatId;
    if (!chat.users) console.log('chats.users is not defined');
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieve.sender._id) {
        return
      };
      socket.in(user._id).emit('message recieved', newMessageRecieve);
    });
  });
});