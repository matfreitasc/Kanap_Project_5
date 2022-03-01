let cart = JSON.parse(localStorage.getItem("cart") || "[]");

let cart__items = document.querySelector("#cart__items");

console.log(cart);

function addToCart() {
  cart.forEach((item) => {
    let itemArticle = document.createElement("article");
    itemArticle.classList.add("cart__item");
    itemArticle.setAttribute("data-id", cart._id);
    itemArticle.setAttribute("data-colors", cart.colors);
    cart__items.appendChild(itemArticle);

    itemArticle.innerHTML = `
      <div class="cart__item__img">
      <img src="${item.imageUrl}" alt="${item.altTxt}" />
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${item.name}</h2>
        <p>${item.colors}</p>
        <p>€: ${item.price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté :</p>
          <input
            type="number"
            class="itemQuantity"
            name="itemQuantity"
            min="1"
            max="100"
            value="${item.quantity}"
          />
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Delete</p>
        </div>
      </div>
    </div>
      `;
  });
}
addToCart();
