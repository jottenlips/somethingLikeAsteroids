// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');

// const port = 4001;

// const app = express();

// // our server instance
// const server = http.createServer(app);

// const io = socketIO(server);

// io.on('connection', socket => {
//   console.log('User connected');

//   socket.on('store change', (store) => {
//   	io.sockets.emit('change store', store);
//   });
  
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// server.listen(port, () => console.log(`Listening on port ${port}`));

const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('vr/build'))

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, error => (
  error
    ? console.error(error)
    : console.info(`Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
));