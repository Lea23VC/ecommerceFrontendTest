import { API_URL } from "../config/api.js";

export default async function getCategories() {
  const url = API_URL + "/categories";
  const response = await fetch(url);

  return await response.json();
}
