import { params } from "../params/paramsUtils.js";
import { loadData } from "../data/loadData.js";

//get the value for every pagination number displayed, add it to the search params, and it load the data again, without refreshing the page
export function paginationRefresh(current_page) {
  //get all paginations number divs from the pagination html
  var hrefs = document.getElementsByClassName("page-item");

  //add a listener for every one on Click event
  for (var i = 0; i < hrefs.length; i++) {
    hrefs.item(i).addEventListener("click", function (e) {
      e.preventDefault();

      //if clicked, set the current page to the search parameters
      params.set("page", getPaginationValue(current_page, e.target.text));

      //and load the data again
      loadData(false);
    });
  }
}

//in case the Next and/or the Prev buttons are available, it calculates the actual value, the current page + or - 1
function getPaginationValue(current_page, value) {
  switch (value) {
    case "Anterior":
      return current_page - 1;
    case "Siguiente":
      return current_page + 1;

    default:
      return value;
  }
}
