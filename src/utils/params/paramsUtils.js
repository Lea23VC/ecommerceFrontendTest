//clear all order parameters from the query
export function clearOrder(params) {
  params.delete("products_by_name_order");
  params.delete("products_by_price_order");
  params.delete("products_by_discount_order");
}

//clear the page parameter
export function clearPage(params) {
  params.delete("page");
}

//clear the name parameter
export function clearName(params) {
  params.delete("name");
}

//clear the category parameter
export function clearCategory(params) {
  params.delete("category");
}

//this function get search parameters that will be used on the query
function getParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams;
}

//export the result from the getParams function for other files
export const params = getParams();
