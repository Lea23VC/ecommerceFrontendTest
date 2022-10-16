export default async function getProducts(searchParams = "") {
  const url = "http://127.0.0.1:8000/products?items_per_page=6&" + searchParams;
  const response = await fetch(url);

  return await response.json();
}
