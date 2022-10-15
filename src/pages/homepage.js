import { products } from "../api/products";

const div = document.getElementById("div");

const paragraph = document.createElement("p");

paragraph.textContent = products;

div.appendChild(paragraph);
