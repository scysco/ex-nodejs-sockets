const express = require('express');
const cors = require('cors');
const {socketController} = require('../sockets/controller');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.paths = {}

    this.middlewares();

    this.routes();

    //Sockets
    this.sockets();
  }

  middlewares(){
    //cors
    this.app.use(cors());
    //public directory
    this.app.use(express.static('public'));
  }

  routes(){
    // this.app.use(this.paths.auth, require('../routes/auth'));
  }

  sockets(){
    this.io.on('connection', socketController);
  }

  listen(){
    this.server.listen(this.port, () => {
      console.log('Server running on port', this.port);
    });
  }
}

module.exports = Server;
