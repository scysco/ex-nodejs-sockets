const lblDesktop = document.querySelector('h1');
const btnNew = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPending = document.querySelector('#lblPending');


const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desktop')) {
  window.location = 'index.html';
  throw new Error('desktop is required');
}

const desktop = searchParams.get('desktop');
lblDesktop.innerText = desktop;

divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () =>{
  btnNew.disabled = false;
});

socket.on('disconnect', () =>{
  btnNew.disabled = true;
});

socket.on('last-ticket', (payload) => {
  // lblNewTicket.innerText = payload;
});
socket.on('ticket-queue', (tickets) => {
  lblPending.innerText = tickets;
});

btnNew.addEventListener('click', () => {

  socket.emit('serve-ticket', {desktop}, ({ok,ticket, msg}) =>{
    if (!ok) {
      lblTicket.innerText = '0 tickets.'
      return divAlert.style.display = '';
    }

    lblTicket.innerText = 'Ticket ' +  ticket.number;

  });
  // socket.emit('next-ticket', null, (ticket) => {
  //   lblNewTicket.innerText = ticket;
  // });
});
 
