import "../css/style.css";
import "./plugins"; // по умолчанию берет index.js файл
import locations from "./store/locations"; // import api from current dir
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketsUI from "./views/tickets";
import favorites from "./store/favorites";
import favoritesUI from "./views/favorite";

document.addEventListener("DOMContentLoaded", e => {
  const form = formUI.form;
  const ticketsContainer = document.querySelector(".tickets-sections");
  const favoritesContainer = favoritesUI.container;

  // Events
  initApp();
  favoritesUI.renderFavoriteTickets();

  form.addEventListener("submit", e => {
    e.preventDefault();
    onFormSubmit();
  });

  ticketsContainer.addEventListener("click", e => {
    if (e.target.classList.contains("add-favorite")) {
      e.target.classList.remove("green");
      e.target.classList.add("disabled");
      const parent = e.target.closest(".ticket-card");
      const id = parent.getAttribute("data-id");
      favorites.putProduct(id);
      favoritesUI.renderFavoriteTickets();
    }
  });

  favoritesContainer.addEventListener("click", e => {
    if (e.target.classList.contains("delete-favorite")) {
      const parent = e.target.closest(".favorite-item");
      const id = parent.getAttribute("data-id");
      favorites.deleteProduct(id);
      favoritesUI.deleteFavoriteTicket(id);
    }
  });

  //Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    //получить все данные из инпутов
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    console.log(origin, destination, depart_date, return_date); // output: Харьков,Украина Москва,Россия 2019-12 2019-12

    //Нужно преобразовать в CODE, CODE, 2019-09, 2019-10
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }
});
