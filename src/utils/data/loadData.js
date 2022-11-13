//gets all rendering utilities
import { paginationRefresh } from "../rendering/paginationRefresh.js";
import { getActivityIndicator } from "../rendering/activityIndicator.js";
import { getCategoryMenu } from "../rendering/categoryMenu.js";
import { getProductsTemplate } from "../rendering/productsTemplate.js";

//get current query parameters
import { params } from "../params/paramsUtils.js";

//get categorylistener for the first load
import { categoryListener } from "../listeners/listeners.js";

//get API functions
import products from "../../api/products.js";
import categories from "../../api/categories.js";

//this function load all the data
export function loadData(load_categories = true) {
  //render activity indicator while the data is loading
  getActivityIndicator();

  //
  //get categories on header element
  const categoriesDropdown = document.querySelector("div#categoriesMenu");

  //get categories on the left section of products
  const categoriesMenu = document.querySelectorAll(".categoriesMenu");

  //products section with .products class
  const element = document.querySelector(".products");

  //this executed the products query with the actual search params
  products(params)
    .then((product) => {
      //it gets an html template with all the products, and it's replace the content of the .product div
      const template = getProductsTemplate(product);

      //add the html templte to the div
      element.innerHTML = template;

      //refresh the pagination depending of the current page of the query page from the backened
      paginationRefresh(product.meta.current_page);
    })
    .catch((error) => {
      //if there's an error, the error will be displayed on the console log, and message will be rendering instead of the products
      console.log(error);
      element.innerHTML = `<h3>Ha ocurrido un error. Por favor intente nuevamente.</h3>`;
    })
    .finally(() => {});

  //same for the category, this one is used for the hover menu and the side category menu
  if (load_categories) {
    //query the categories data from the backend
    categories().then((categoriesData) => {
      //gets the category menu html from the header
      const template = getCategoryMenu(categoriesData.data);

      // and add it to the div
      categoriesDropdown.innerHTML = template;

      //same with the category menu on the left
      categoriesMenu[0].innerHTML = template;

      categoryListener();
    });
  }
}
