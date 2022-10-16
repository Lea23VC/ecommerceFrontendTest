import products from "../api/products.js";
import categories from "../api/categories.js";

function loadData() {
  const categoriesDropdown = document.querySelector("div#categoriesMenu");
  const categoriesMenu = document.querySelectorAll(".categoriesMenu");
  console.log(categoriesMenu);
  const element = document.querySelector("div#div");

  products().then((posts) => {
    console.log("Posts: ", posts.data);
    const template = getTemplate(posts.data);

    element.innerHTML = template;
  });

  categories().then((categoriesData) => {
    console.log("Categories: ", categoriesData.data);
    const template = getCategoryMenu(categoriesData.data);

    categoriesDropdown.innerHTML = template;

    categoriesMenu.forEach((item) => {
      console.log("Item: ", item);
      const template = getCategoryMenu(categoriesData.data);
      item.innerHTML = template;
    });
  });
}

function getTemplate(posts) {
  const rows = posts.map(postToRowView).join("");
  console.log("rows: ", rows);

  return `<table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
  
      <tbody>${rows}</tbody>
    </table>`;
}

function getCategoryMenu(categories) {
  const data = categories.map(categoriesView).join("");

  return `${data} `;
}

function postToRowView(post) {
  return `<t>
      <td>${post.name}</td>
      <td>${post.price}</td>
    </tr>`;
}

function categoriesView(category) {
  return `
    <div>${category.name}</div>
    
    `;
}

loadData();
