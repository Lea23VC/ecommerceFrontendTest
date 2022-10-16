import products from "../api/products.js";
import categories from "../api/categories.js";

window.onload = function () {
  document.getElementById("frmSubmit").onsubmit = function onSubmit(form) {
    var isValid = false;
    //validate your elems here
    var search = document.getElementById("search-keywords");

    if (search.value == "") {
      alert("Ingrese algún valor para buscar");
      return false;
    } else {
      //you are good to go
      window.location.search = `&name=${search.value}`;
      return false;
    }
  };
};

function getParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams;
}

function loadData() {
  const categoriesDropdown = document.querySelector("div#categoriesMenu");
  const categoriesMenu = document.querySelectorAll(".categoriesMenu");

  console.log(categoriesMenu);
  const element = document.querySelector(".products");

  products(getParams()).then((posts) => {
    console.log("Posts: ", posts.data);
    const template = getTemplate(posts);

    element.innerHTML = template;
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

  ${getPagination(posts)}
  `;
}

function getPagination(products) {
  const links = products.meta.links.map((link) => {
    return (
      link.url &&
      `<li class="page-item"><a class="page-link" href="#">${link.label}</a></li>`
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
  const data = categories.map(categoriesView).join("");

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

loadData();
