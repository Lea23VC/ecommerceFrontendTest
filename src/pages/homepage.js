import products from "../api/products.js";
import categories from "../api/categories.js";
import { getParams, clearOrder, clearPage } from "../utils/paramsUtils.js";

//obtain parameters from get request
const params = getParams();

function searchByName() {
  //get search form
  const select = document.getElementById("form-button");
  select.addEventListener("click", function handlerClick(event) {
    var search = document.getElementById("search-keywords");
    if (search.value == "") {
      alert("Ingrese algún valor para buscar");
      return false;
    } else {
      //set name filters in search parameters
      params.set("name", search.value);
      replaceTitleWithSearch(search.value);

      //load data
      loadData();
    }
  });
}

window.onload = function () {
  //get select dropdown
  const select = document.getElementById("form-select");

  //add listener everytime the dropdown changes
  select.addEventListener("change", function handleChange(event) {
    //for every option, the page and the order options are deleted
    //every options adds a order filter to the query
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
    loadData();
  });
};

//an activity indicator is displayed everytime a query is executed, for better user experience
function getActivityIndicator() {
  //search for div with .products class and replace the content with an activity indicator
  const element = document.querySelector(".products");
  element.innerHTML = `<div class="col-span-full flex justify-center">
  <div
    class="activity border-t-8 border-8 border-lightGrey border-t-pink w-[120px] h-[120px] rounded-full animate-spin justify-center"
  ></div>`;
}

//in case the search bar is used, the title will change
function replaceTitleWithSearch(title_data = null) {
  const title = document.querySelector(".title");
  title.innerHTML = title_data
    ? `<h2>Resultados de: ${title_data} </h2>`
    : "<h2>Nuestra colección</h2>";
}

//this function load all the data
function loadData() {
  getActivityIndicator();
  const categoriesDropdown = document.querySelector("div#categoriesMenu");
  const categoriesMenu = document.querySelectorAll(".categoriesMenu");

  console.log(categoriesMenu);
  const element = document.querySelector(".products");

  //this executed the products query with the actual search params
  products(params).then((product) => {
    console.log("Posts: ", product);

    //it gets an html template with all the products, and it's replace the content of the .product div
    const template = getTemplate(product);

    element.innerHTML = template;

    paginationRefresh(product.meta.current_page);
  });

  //same for the category, this one is used for the hover menu and the side category menu
  categories().then((categoriesData) => {
    const template = getCategoryMenu(categoriesData.data);

    categoriesDropdown.innerHTML = template;

    categoriesMenu.forEach((item) => {
      const template = getCategoryMenu(categoriesData.data);
      item.innerHTML = template;
    });
  });
}

//this get a div for every product, and they are map together in a single column grid, includes even the pagination
function getTemplate(posts) {
  const rows = posts.data.map(postToRowView).join("");

  return `${rows}
  <div class="col-span-full justify-self-center">${
    rows ? getPagination(posts) : `<h3> No hay resultados</h3>`
  }</div>
 
  `;
}

//This replace the Next and Prev value from the standard backend pagination with spanish words
function getLabel(label) {
  switch (label) {
    case "&laquo; Previous":
      return "Anterior";
    case "Next &raquo;":
      return "Siguiente";
    default:
      return label;
  }
}

//get the pagination data from the products query, and creates an html with all the availables pages
function getPagination(products) {
  const links = products.meta.links
    .map((link) => {
      console.log("label: ", link.label);

      return (
        link.url &&
        `<li class="page-item ${
          link.active && `font-bold`
        } "><a class="page-link cursor-pointer hover:no-underline ${
          link.active && `text-pink`
        }" >${getLabel(link.label)}</a></li>`
      );
    })
    .filter(Boolean)
    .toString()
    .replaceAll(",", "");

  console.log("links map: ", links);

  return `<nav aria-label="Page navigation example">
    <ul class="pagination  flex-wrap justify-center">
    ${links}
    </ul>
  </nav>`;
}

//creates a div with every category from the database, and add an "ALL" category
function getCategoryMenu(categories) {
  const all = `<a href="/" ><div class="${
    !getParams().get("category") && "font-bold text-pink"
  } " >Todo</div></a>`;
  const data = all + categories.map(categoriesView).join("");
  return `${data} `;
}

//this creates the single one product div for every product from the query, this uses all its data; name, price, discount and image
function postToRowView(product) {
  const discount = product.discount
    ? `<div class="inline-block absolute bg-pink inset-0 w-[40px] h-[40px] p-2 rounded-full grid place-items-center left-auto" ><h6 class="text-xs text-white font-bold">${product.discount}%</h6></div>`
    : "";

  const price =
    product.discount == 0
      ? "$" + product.price
      : ` $${product.price} <span class="font-light line-through">$${
          product.price + product.price * (product.discount / 100)
        }</span>`;

  return `         <div
  class="product-box border-softPink border-2 flex justify-start p-2 flex-col gap-2 relative"
>
  <div class="image-wrapper aspect-square">
    <img
      class="w-[100%] h-auto"
      src="${product.url_image}"
    />
  </div>

  <div class="button-product">
    <a href="#">
      <button
        class="w-[100%] bg-black text-white p-2 hover:bg-pink duration-300"
      >
        Añadir al carro
      </button>
    </a>
  </div>

  <div class="product-details text-center py-4">
    <h4 class="text-base">${product.name}</h4>
    <h5 class="text-sm font-bold">${price}</h5>
    ${discount}

  </div>
</div>`;
}

//it creates an anchor for every category, every href y the same page url, with the category params
function categoriesView(category) {
  return `
    <a href="?category=${category.id}" ><div class="${
    getParams().get("category") == category.id && "font-bold text-pink"
  } " >${category.name}</div></a>
    
    `;
}

//get the value for every pagination number displayed, add it to the search params, and ii load the data again, without refreshing the page
function paginationRefresh(current_page) {
  var hrefs = document.getElementsByClassName("page-item");
  for (var i = 0; i < hrefs.length; i++) {
    hrefs.item(i).addEventListener("click", function (e) {
      e.preventDefault();
      params.set("page", getPaginationValue(current_page, e.target.text));

      loadData(params);
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

//in case the clear button in clicked in the search form, it removes the text from the form, delete name from the search params, replace the title and load the data without refresh
function clearSearchBar() {
  var element = document.getElementById("clear-button");

  element.addEventListener("click", function (e) {
    document.getElementById("search-keywords").value = "";
    params.delete("name");

    replaceTitleWithSearch();

    loadData();
  });
}

//load the data on load
loadData();

//add listener to the search form
searchByName();

//add listener to the clear button
clearSearchBar();
