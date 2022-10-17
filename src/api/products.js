import { API_URL } from "../config/api.js";

export default async function getProducts(searchParams = "") {
  console.log("API_URL", API_URL);
  const url = API_URL + "/products?items_per_page=6&" + searchParams;
  const response = await fetch(url);

  return await response.json();
}
