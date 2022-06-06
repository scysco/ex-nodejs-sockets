const lblTicket1 = document.querySelector('#lblTicket1');
const lbldesktop1 = document.querySelector('#lbldesktop1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lbldesktop2 = document.querySelector('#lbldesktop2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lbldesktop3 = document.querySelector('#lbldesktop3');
const lblTicket4 = document.querySelector('#lblTicket4');
const lbldesktop4 = document.querySelector('#lbldesktop4');



const socket = io();

socket.on('last-4', (payload) => {
  const audio = new Audio('./audio/new-ticket.mp3');
  audio.play();
  const [ticket1, ticket2, ticket3, ticket4] = payload;
  if (ticket1) {
    lblTicket1.innerText = 'Ticket ' + ticket1.number; 
    lbldesktop1.innerText = ticket1.desktop;    
  }
  if (ticket2) {
    lblTicket2.innerText = 'Ticket ' +ticket2.number; 
    lbldesktop2.innerText = ticket2.desktop;  
  }
  if (ticket3) {
    lblTicket3.innerText = 'Ticket ' +ticket3.number;  
    lbldesktop3.innerText = ticket3.desktop;  
  }
  if (ticket4) {
    lblTicket4.innerText = 'Ticket ' +ticket4.number;  
    lbldesktop4.innerText = ticket4.desktop;   
  }

});
