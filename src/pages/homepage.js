import products from "../api/products.js";
import categories from "../api/categories.js";

const params = getParams();

function searchByName() {
  const select = document.getElementById("form-button");
  console.log("select: ", select);

  select.addEventListener("click", function handlerClick(event) {
    // window.location.search = `&${params}`;
    var isValid = false;
    //validate your elems here
    var search = document.getElementById("search-keywords");
    console.log("eee");

    if (search.value == "") {
      alert("Ingrese algún valor para buscar");
      return false;
    } else {
      //you are good to go
      params.set("name", search.value);
      // window.location.search = `&${params}`;
      getActivityIndicator();
      replaceTitleWithSearch(search.value);
      loadData(params);
    }
  });
}

function clearOrder() {
  params.delete("products_by_name_order");
  params.delete("products_by_price_order");
  params.delete("products_by_discount_order");
}

function clearPage() {
  params.delete("page");
}

window.onload = function () {
  const select = document.getElementById("form-select");

  select.addEventListener("change", function handleChange(event) {
    console.log(JSON.parse(event.target.value)); // 👉️ get selected VALUE
    // const params = getParams();
    clearPage();
    clearOrder();
    switch (JSON.parse(event.target.value)) {
      case 0:
        break;

      case 1:
        // code block
        params.set("products_by_name_order", "asc");
        break;
      case 2:
        params.set("products_by_name_order", "desc");
        // code block
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

      default:
      // code block
    }
    getActivityIndicator();
    loadData(params);

    // window.location.search = `&${params}`;
  });
};

function getActivityIndicator() {
  const element = document.querySelector(".products");

  element.innerHTML = `<div class="col-span-full flex justify-center">
  <div
    class="activity border-t-8 border-8 border-lightGrey border-t-pink w-[120px] h-[120px] rounded-full animate-spin justify-center"
  ></div>`;
}

function getParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // if (urlParams.get("name")) {
  //   replaceTitleWithSearch(urlParams.get("name"));
  // }

  return urlParams;
}

function replaceTitleWithSearch(title_data) {
  const title = document.querySelector(".title");
  title.innerHTML = `<h2>Resultados de: ${title_data} </h2>`;
}

function loadData(search_params = null) {
  const categoriesDropdown = document.querySelector("div#categoriesMenu");
  const categoriesMenu = document.querySelectorAll(".categoriesMenu");

  console.log(categoriesMenu);
  const element = document.querySelector(".products");

  products(search_params ? search_params : getParams()).then((posts) => {
    console.log("Posts: ", posts.data);
    const template = getTemplate(posts);

    element.innerHTML = template;

    paginationRefresh();
  });

  categories().then((categoriesData) => {
    console.log("Categories: ", categoriesData.data);
    const template = getCategoryMenu(categoriesData.data);

    categoriesDropdown.innerHTML = template;

    categoriesMenu.forEach((item) => {
      console.log("Item: ", item);
      const template = getCategoryMenu(categoriesData.data);
      item.innerHTML = template;
    });
  });
}

function getTemplate(posts) {
  const rows = posts.data.map(postToRowView).join("");
  console.log("rows: ", rows);

  return `${rows}

  <div class="col-span-full justify-self-center	">${
    rows ? getPagination(posts) : `<h3> No hay resultados</h3>`
  }</div>
 
  `;
}

function getPagination(products) {
  const links = products.meta.links.map((link) => {
    const urlParams = getParams();

    urlParams.set("page", link.url && link.label);

    return (
      link.url &&
      `<li class="page-item ${
        link.active && `font-bold`
      } "><a class="page-link cursor-pointer hover:no-underline ${
        link.active && `text-pink`
      }" >${link.label}</a></li>`
    );
  });

  console.log("links map: ", links);

  return `<nav aria-label="Page navigation example">
    <ul class="pagination">
    ${links}
    </ul>
  </nav>`;
}

function getCategoryMenu(categories) {
  const all = `<a href="/" ><div class="${
    !getParams().get("category") && "font-bold text-pink"
  } " >Todo</div></a>`;

  const data = all + categories.map(categoriesView).join("");

  return `${data} `;
}

function postToRowView(product) {
  console.log(product);
  const price =
    product.discount == 0
      ? "$" + product.price
      : ` $${product.price} <span class="font-light line-through">$${
          product.price + product.price * (product.discount / 100)
        }</span>`;

  return `         <div
  class="product-box border-softPink border-2 flex justify-start p-2 flex-col gap-2"
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
  </div>
</div>`;
}

function categoriesView(category) {
  return `
    <a href="?category=${category.id}" ><div class="${
    getParams().get("category") == category.id && "font-bold text-pink"
  } " >${category.name}</div></a>
    
    `;
}

function paginationRefresh() {
  console.log(params);
  var hrefs = document.getElementsByClassName("page-item");
  for (var i = 0; i < hrefs.length; i++) {
    hrefs.item(i).addEventListener("click", function (e) {
      e.preventDefault(); /*use if you want to prevent the original link following action*/
      params.set("page", e.target.text);
      getActivityIndicator();
      loadData(params);
    });
  }
}

loadData();
searchByName();
