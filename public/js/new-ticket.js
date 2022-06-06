const lblNewTicket  = document.querySelector('#lblNewTicket');   
const btnNew = document.querySelector('button');  

const socket = io();

socket.on('connect', () =>{
  btnNew.disabled = false;
});

socket.on('disconnect', () =>{
  btnNew.disabled = true;
});

socket.on('last-ticket', (payload) => {
  lblNewTicket.innerText = payload;
});

btnNew.addEventListener('click', () => {
  socket.emit('next-ticket', null, (ticket) => {
    lblNewTicket.innerText = ticket;
  });
});
