import {
  categoryListener,
  dropdownListener,
  clearSearchBar,
  searchByName,
} from "../utils/listeners/listeners.js";

import { loadData } from "../utils/data/loadData.js";

//obtain parameters from get request

//load the initial data on load
loadData();

//add listener to dropdown
dropdownListener();

//add listener to the search form
searchByName();

//add listener to the clear button
clearSearchBar();

//add listener to category list on header and the left section of the products
categoryListener();
