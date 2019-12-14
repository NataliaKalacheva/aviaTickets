import favorites from "../store/favorites";
import currencyUI from "./currency";

class FavoriteTickets {
  constructor(currency) {
    this.container = document.querySelector(".favorites #dropdown1");
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  renderFavoriteTickets() {
    this.clearContainer();
    let tickets = favorites.tickets;

    if (tickets.length === 0) {
      this.showEmptyMsg();
    }
    let fragment = "";
    const currency = this.getCurrencySymbol();
    tickets.forEach(ticket => {
      let template = FavoriteTickets.favoriteTicketTemplate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  deleteFavoriteTicket(id) {
    let tickets = favorites.tickets;
    let ticket = document.querySelector(`[data-id="${id}"]`);
    this.container.removeChild(ticket);
    if (tickets.length === 0) {
      this.showEmptyMsg();
    }
  }

  clearContainer() {
    this.container.innerHTML = "";
  }
  showEmptyMsg() {
    const template = FavoriteTickets.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  static emptyMsgTemplate() {
    return `<div class="tickets-empty-res-msg">
      У вас пока нет избранных билетов
    </div>`;
  }

  static favoriteTicketTemplate(favorite, currency) {
    return `<div class="favorite-item  d-flex align-items-start" data-id="${favorite.ticket_id}">
     <img
       src="${favorite.airline_logo}"
       class="favorite-item-airline-img"
     />
     <div class="favorite-item-info d-flex flex-column">
       <div
         class="favorite-item-destination d-flex align-items-center"
       >
         <div class="d-flex align-items-center mr-auto">
           <span class="favorite-item-city">${favorite.origin_name}</span>
           <i class="medium material-icons">flight_takeoff</i>
         </div>
         <div class="d-flex align-items-center">
           <i class="medium material-icons">flight_land</i>
           <span class="favorite-item-city">${favorite.destination_name}</span>
         </div>
       </div>
       <div class="ticket-time-price d-flex align-items-center">
         <span class="ticket-time-departure">${favorite.departure_at}</span>
         <span class="ticket-price ml-auto">${currency}${favorite.price}</span>
       </div>
       <div class="ticket-additional-info">
         <span class="ticket-transfers">Пересадок: ${favorite.transfers}</span>
         <span class="ticket-flight-number">Номер рейса: ${favorite.flight_number}</span>
       </div>
       <a
         class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
         >Delete</a
       >
     </div>
   </div>`;
  }
}

const favoritesUI = new FavoriteTickets(currencyUI);

export default favoritesUI;
