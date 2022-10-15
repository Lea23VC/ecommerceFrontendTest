import products from "../api/products.js";

function loadData() {
  const element = document.querySelector("div#div");

  products().then((posts) => {
    console.log("Posts: ", posts.data);
    const template = getTemplate(posts.data);

    element.innerHTML = template;
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

function postToRowView(post) {
  return `<t>
      <td>${post.name}</td>
      <td>${post.price}</td>
    </tr>`;
}

loadData();
