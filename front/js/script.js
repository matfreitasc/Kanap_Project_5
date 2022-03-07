let items = document.querySelector("#items");
// Connection with the database is done in the following function
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((jsonResponse) => createProductCards(jsonResponse));

function createProductCards(productCards) {
  console.log(productCards);
  productCards.forEach((productCard) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `

        <a href="./product.html?id=${productCard._id}">
        <article>
        <img src="${productCard.imageUrl}" alt="${productCard.altTxt}">
        <h3 class="productName">${productCard.name}</h3>
        <p class="productDescription">${productCard.description}</p>
        </article>
        </a>
        `;
    items.appendChild(card);
  });
}
