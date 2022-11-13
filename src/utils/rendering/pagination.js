//get the pagination data from the products query, and creates an html with all the availables pages
export function getPagination(products) {
  //get the pagination links from the backend
  const links = products.meta.links

    //using every link, return and html with a list with them
    //if the current pagination from the query and the one from this html are the same, add bold and pink color to indicate the active one
    .map((link) => {
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

  //add the pagination html to the nav ul from Bootstrap
  return `<nav aria-label="Page navigation example">
      <ul class="pagination  flex-wrap justify-center">
      ${links}
      </ul>
    </nav>`;
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
