//in case the search bar is used, the title will change
export function replaceTitleWithSearch(title_data = null) {
  const title = document.querySelector(".title");
  title.innerHTML = title_data
    ? `<h2>Resultados de: ${title_data} </h2>`
    : "<h2>Nuestra colección</h2>";
}
