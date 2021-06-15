const startPrompt = require('./helpers/prompt');
const io = require('socket.io')(3636);
const createBlankFile = require('./helpers/createInitialFile')


io.on('connection', function (socket) {
  socket.on('send', function (data) {
  io.emit('message', data);
  });
});

createBlankFile();
startPrompt();



