//this get a div for every product, and they are map together in a single column grid, includes even the pagination

import { getPagination } from "../rendering/pagination.js";

//using all the products, create a grid for all of them
export function getProductsTemplate(products) {
  //use product grid for create a grid for every product and join them
  const rows = products.data.map(productGrid).join("");

  //return the products grid and append the pagination
  return `${rows}
    <div class="col-span-full justify-self-center">${
      rows ? getPagination(products) : `<h3> No hay resultados</h3>`
    }</div>
   
    `;
}

//this creates the single one product div for every product from the query, this uses all its data; name, price, discount and image
function productGrid(product) {
  //if the product has a discount, add a discount badget
  const discount = product.discount
    ? `<div class="inline-block absolute bg-pink inset-0 w-[40px] h-[40px] p-2 rounded-full grid place-items-center left-auto" ><h6 class="text-xs text-white font-bold">${product.discount}%</h6></div>`
    : "";

  //if the there's a dicount, calculates the old price and add it to the current price for comparing, if not, only the current price is displayed
  const price =
    product.discount == 0
      ? "$" + product.price
      : ` $${product.price} <span class="font-light line-through">$${
          product.price + product.price * (product.discount / 100)
        }</span>`;

  //return a html with the products data, using TailwindCSS, if there's no image on the database for the product, a placeholder will be shown
  return `         <div
    class="product-box border-softPink border-2 flex justify-start p-2 flex-col gap-2 relative"
  >
    <div class="image-wrapper aspect-square">
      <img
        class="w-[100%] h-auto"
        src="${
          product.url_image
            ? product.url_image
            : "/src/images/placeholder-image.webp"
        }"
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
