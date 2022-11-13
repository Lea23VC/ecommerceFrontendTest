//get params utilities, for retrieve and delete data

import {
  params,
  clearPage,
  clearCategory,
  clearOrder,
  clearName,
} from "../params/paramsUtils.js";

//get loadData function for results refetch
import { loadData } from "../data/loadData.js";

//get replaceTitle utility
import { replaceTitleWithSearch } from "../rendering/replaceTitle.js";

//add listener to both categories section on header and the left
export function categoryListener() {
  //get all elements with category class
  var categories = document.getElementsByClassName("category");

  //for each one, add a listener for the click event
  for (var i = 0; i < categories.length; i++) {
    categories.item(i).addEventListener("click", function (e) {
      e.preventDefault();

      //if the target has an ID that's not all, add the category ID to the query parameters
      if (e.target.id != "all") params.set("category", e.target.id);
      //if not, remove the category param from the query
      else clearCategory(params);

      //remove page from the query params
      clearPage(params);

      //load data
      loadData(false);

      //add active class to the ones with the selected category
      addActiveCategory();
    });
  }
}

//add active category
function addActiveCategory() {
  //get all elements with the category class
  var categories = document.getElementsByClassName("category");
  for (var i = 0; i < categories.length; i++) {
    //for all elements, removes active, and the two classes from tailwind, font-bold and text-pink
    categories.item(i).classList.remove("active");
    categories.item(i).classList.remove("font-bold");
    categories.item(i).classList.remove("text-pink");

    //if the element matches the current category ID from the query parameters, add the classes, for both the header and the left
    if (
      categories.item(i).id === params.get("category") ||
      (!params.get("category") && categories.item(i).id === "all")
    ) {
      categories.item(i).classList.add("active");
      categories.item(i).classList.add("font-bold");
      categories.item(i).classList.add("text-pink");
    }
  }
}

//add dropdown listener
export function dropdownListener() {
  //get select dropdown element
  const select = document.getElementById("form-select");

  //add listener for everytime the dropdown changes
  select.addEventListener("change", function handleChange(event) {
    //for every option, the page and the order options are deleted
    //every options adds a order filter to the query

    //remove the order and page params from the query
    clearPage(params);
    clearOrder(params);
    switch (JSON.parse(event.target.value)) {
      case 0:
        break;
      case 1:
        params.set("products_by_name_order", "asc");
        break;
      case 2:
        params.set("products_by_name_order", "desc");

        break;

      case 3:
        params.set("products_by_price_order", "asc");
        break;
      case 4:
        params.set("products_by_price_order", "desc");
        break;

      case 5:
        params.set("products_by_discount_order", "asc");
        break;

      case 6:
        params.set("products_by_discount_order", "desc");
        break;
    }

    //finaly, loads the data again
    loadData(false);
  });
}

//in case the clear button in clicked in the search form, it removes the text from the form, delete name from the search params, replace the title and load the data without refresh
export function clearSearchBar() {
  //get clear button element
  var element = document.getElementById("clear-button");

  //add listener for the click event
  element.addEventListener("click", function (e) {
    //if the button is clicked, remove the current text from the form at the left
    document.getElementById("search-keywords").value = "";

    //clear both name and page params from the query
    clearName(params);
    clearPage(params);

    //replace the title with standard one
    replaceTitleWithSearch();

    //and load the data again
    loadData(false);
  });
}

export function searchByName() {
  //get search form
  var search = document.getElementById("search-keywords");

  //search button from the right
  const select = document.getElementById("form-button");

  //add listener for the click event
  select.addEventListener("click", function handlerClick(event) {
    //if the form search is empty, an alert will be displayed
    if (search.value == "") {
      alert("Ingrese algún valor para buscar");
      return false;
    } else {
      //in the other case, set the name parameter to the search query
      params.set("name", search.value);

      //replace the title with the current name parameter
      replaceTitleWithSearch(search.value);

      //and finally, load the data
      loadData(false);
    }
  });
}
