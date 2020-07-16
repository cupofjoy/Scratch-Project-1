const path = require('path');
const express = require('express');
const userController = require('../server/controllers/userController');
const axios = require('axios');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const socket = require('socket.io');

dotenv.config();

const app = express();
const PORT = 3000;

// --------- database connection ------
const mongoose = require('mongoose');
const databaseURL = process.env.MONGO_URI;
// replce databaseURL with your database key/link
mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to Mongo Database');
});
// --------- database connection ------

// --------- Schema imports -----------
// --------- import to Controllers
// --------- Schema imports -----------

// parsing requests
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/asset', express.static(path.join(__dirname, '../client/asset')));
app.post('/signup', userController.createUser);
app.post('/login', userController.verifyUser);

// app.get('/github/register', (req, res) => {
//   console.log('github register')
//   res.redirect("https://github.com/login/oauth/authorize?client_id=7767f930d994a15db0d0&redirect_uri=http://localhost:8080/github/callback")
// });


// https://github.com/login/oauth/access_token
app.get('/github/callback', userController.getToken, userController.getGithubUser)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

const {
  default: Axios
} = require('axios');

const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

const io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('new connection:', socket.id);
  // function to receive code
  socket.on('mouse', mouseMsg);
  socket.on('clear', () => {
    socket.broadcast.emit('clearBack');
  });
  socket.on('down', (data) => {
    socket.broadcast.emit('down', data);
  });
  socket.on('message', (newMessage) => {
    console.log('message received: ', newMessage)
    socket.broadcast.emit('messageBraodcast', newMessage);
  })

  // receieves mouse coordinates
  function mouseMsg(data) {
    // broadcasts data to everyone who is connected
    console.log(data);
    socket.broadcast.emit('mouseback', data);
    // globally emit data to everyone
  }
}