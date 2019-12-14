// Реализовать функционал добавления билетов в избранные. У вас должно быть отдельное хранилище (store) для избранных билетов.
// При клике на кнопу "Add to favorites" объект билета нужно добавлять в хранилище. В шапке есть дропдаун в котором нужно выводить все избранные билеты.
import locations from "./locations";

class Favorites {
  constructor() {
    this.tickets = [];
  }

  putProduct(id) {
    let allTickets = locations.lastSearch;
    let newFavoriteTicket = allTickets.find(item => item.ticket_id === id);

    return this.tickets.push(newFavoriteTicket);
  }

  deleteProduct(id) {
    let el = this.tickets.find(item => item.ticket_id === id);
    let index = this.tickets.indexOf(el);
    this.tickets.splice(index, 1);
  }
}

const favorites = new Favorites();

export default favorites;
