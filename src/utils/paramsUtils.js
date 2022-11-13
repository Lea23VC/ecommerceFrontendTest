export function clearOrder(params) {
  params.delete("products_by_name_order");
  params.delete("products_by_price_order");
  params.delete("products_by_discount_order");
}
export function clearPage(params) {
  params.delete("page");
}

export function clearName(params) {
  params.delete("name");
}

export function clearCategory(params) {
  params.delete("category");
}

export function getParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams;
}
