import { params } from "../params/paramsUtils.js";

//creates a div with every category from the database, and add an "ALL" category
export function getCategoryMenu(categories) {
  //add the "all" or "Todos" category manually to the categories
  const all = `<a href=""><div id="${
    !params.get("category") && "all"
  }" class="category ${
    !params.get("category") && "font-bold text-pink active"
  }" >Todo</div></a>`;

  //append all category to the others
  const data = all + categories.map(categoriesView).join("");

  //return final category menu
  return `${data} `;
}
//add the active class, and the tailwind classes for bold and pink color for the text if the category matches the query parameters
function categoriesView(category) {
  return `
      <a href=""><div id="${category.id}" class="category ${
    params.get("category") == category.id && "active font-bold text-pink"
  } " >${category.name}</div></a>
      
      `;
}
