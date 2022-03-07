let cart = JSON.parse(localStorage.getItem("cart") || "[]");

let cart__items = document.querySelector("#cart__items");

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

    // Handle item quantity change
    let itemQuantity = document.querySelectorAll(".itemQuantity");
    for (let i = 0; i < itemQuantity.length; i++) {
      itemQuantity[i].addEventListener("input", (e) => {
        cart[i].quantity = e.target.value;
        // update cart in local storage
        localStorage.setItem("cart", JSON.stringify(cart));

        getTotalQuantity();
        getTotalPrice();
      });
    }
  }

  // Handle item delete

  function deleteItemFromCart() {
    let deleteItem = document.querySelectorAll(".deleteItem");
    for (let i = 0; i < deleteItem.length; i++) {
      deleteItem[i].addEventListener("click", (e) => {
        newQuantity = 0;
        if (newQuantity === 0) {
          cart.splice(i, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          e.target.parentElement.parentElement.parentElement.parentElement.remove();
        }
        getTotalPrice();
        getTotalQuantity();
      });
    }
  }

  deleteItemFromCart();

  // Get Total quantity of items inside the cart
  function getTotalQuantity() {
    let totalQuantity = document.querySelector("#totalQuantity");

    if (cart.length === 0) {
      totalQuantity.innerHTML = 0;
      cart__items.innerHTML = "No items in your cart";
    } else
      total = cart.reduce((preValue, CurrentValue) => {
        return {
          quantity:
            parseInt(preValue.quantity, 10) +
            parseInt(CurrentValue.quantity, 10),
        };
      });
    totalQuantity.innerHTML = total.quantity;
  }
  getTotalQuantity();

  // Calculae total price of items inside the cart
  function getTotalPrice() {
    let totalPrice = document.querySelector("#totalPrice");
    let priceTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      priceTotal += cart[i].price * cart[i].quantity;
    }
    totalPrice.innerHTML = priceTotal;
    console.log("totalPrice", priceTotal);
  }
  getTotalPrice();
}

// form Validation

const form_Data = document.getElementsByClassName("cart__order__form")[0];

form_Data.firstName.addEventListener("change", function () {
  validName(this);
});
form_Data.lastName.addEventListener("change", function () {
  validName(this);
});

const validName = function (inputName) {
  let nameRegExp = new RegExp("^[^- ][a-zA-Z '-àâäéèêëïîôöùûü]*[^- ]$", "g");
  let testName = nameRegExp.test(inputName.value);
  if (testName) {
    inputName.nextElementSibling.innerHTML = "Valid";
    inputName.nextElementSibling.style.color = "green";
    return true;
  } else {
    inputName.nextElementSibling.innerHTML = "Invalid";
    inputName.nextElementSibling.style.color = "red";
    return false;
  }
};

//Address
form_Data.address.addEventListener("change", function () {
  validAddress(this);
});

addToCart(cart);
