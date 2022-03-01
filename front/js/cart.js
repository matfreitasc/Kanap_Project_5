let cart = JSON.parse(localStorage.getItem("cart") || "[]");

let cart__items = document.querySelector("#cart__items");

console.log(cart);

function addToCart() {
  for (i = 0; i < cart.length; i++) {
    let itemArticle = document.createElement("article");
    itemArticle.classList.add("cart__item");
    itemArticle.setAttribute("data-id", cart[i]._id);
    itemArticle.setAttribute("data-colors", cart[i].colors);
    cart__items.appendChild(itemArticle);

    itemArticle.innerHTML = `
          <div class="cart__item__img">
          <img src="${cart[i].imageUrl}" alt="${cart[i].altTxt}" />
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${cart[i].name}</h2>
            <p>${cart[i].colors}</p>
            <p>€: ${cart[i].price}</p>
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
                value="${cart[i].quantity}"
              />
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Delete</p>
            </div>
          </div>
        </div>
          `;
  }
  // handle item quantity change
  let itemQuantity = document.querySelectorAll(".itemQuantity");
  for (let i = 0; i < itemQuantity.length; i++) {
    itemQuantity[i].addEventListener("input", (e) => {
      cart[i].quantity = e.target.value;
      // update cart in local storage
      localStorage.setItem("cart", JSON.stringify(cart));

      console.log(cart);
    });
  }
  // if item quantity is 0, remove item from cart

  // handle item delete
  let deleteItem = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", (e) => {
      cart.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      // delete item from cart
      e.target.parentElement.parentElement.parentElement.parentElement.remove();

      console.log(cart);
    });
  }
  // if cart is empty, display empty cart message
  if (cart.length === 0) {
    cart__items.innerHTML = `
        <div class="cart__empty">
            <p>Your cart is empty</p>
        </div>
        `;
  }

  // get total price
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  document.querySelector("#totalPrice").innerHTML = totalPrice;
}

addToCart();
