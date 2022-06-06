const TicketControl = require('../models/ticket-control')

const ticketControl = new TicketControl();


const socketController = socket =>{
  socket.emit('last-ticket', 'Ticket '+ticketControl.last);
  socket.emit('last-4', ticketControl.last4);
  socket.emit('ticket-queue', ''+ticketControl.tickets.length);

  socket.on('next-ticket', (_, callback) => {
    const next = ticketControl.next();
    socket.broadcast.emit('ticket-queue', ticketControl.tickets.length);

    callback(next);
  });

  socket.on('serve-ticket', ({desktop},callback) => {
    if (!desktop) {
      return callback({
        ok:false,
        msg: 'desktop is required'
      });
    }
    const ticket = ticketControl.serveTicket(desktop);

    socket.broadcast.emit('last-4', ticketControl.last4);
    socket.broadcast.emit('ticket-queue', ticketControl.tickets.length);
    socket.emit('ticket-queue', ticketControl.tickets.length);

    if (!ticket) {
      callback({
        ok:false,
        msg: 'There are no more tickets'
      });
    }else{
      callback({
        ok: true,
        ticket
      })
    }
  });
}

module.exports = {
  socketController,
}
