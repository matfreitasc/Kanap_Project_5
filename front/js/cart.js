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
const form__data = document.getElementsByClassName("cart__order__form")[0];

// Validate First Name using regex
function validateName() {
  let name = document.getElementById("firstName");
  let nameRegex = /^[a-zA-Z]{2,}$/;
  if (nameRegex.test(name.value)) {
    name.classList.remove("is-invalid");
    name.classList.add("is-valid");
    return true;
  } else {
    name.classList.remove("is-valid");
    name.classList.add("is-invalid");
    return false;
  }
}
// Validate Last Name using regex
function validateLastName() {
  let lastName = document.getElementById("lastName");
  let lastNameRegex = /^[a-zA-Z]{2,}$/;
  if (lastNameRegex.test(lastName.value)) {
    lastName.classList.remove("is-invalid");
    lastName.classList.add("is-valid");
    return true;
  } else {
    lastName.classList.remove("is-valid");
    lastName.classList.add("is-invalid");
    return false;
  }
}

// Validate home address using regex
function validateAddress() {
  let address = document.getElementById("address");
  let addressRegex = /^[a-zA-Z0-9]{2,}$/;
  if (addressRegex.test(address.value)) {
    address.classList.remove("is-invalid");
    address.classList.add("is-valid");
    return true;
  } else {
    address.classList.remove("is-valid");
    address.classList.add("is-invalid");
    return false;
  }
}
// Validate city using regex
function validateCity() {
  let city = document.getElementById("city");
  let cityRegex = /^[a-zA-Z]{2,}$/;
  if (cityRegex.test(city.value)) {
    city.classList.remove("is-invalid");
    city.classList.add("is-valid");
    return true;
  } else {
    city.classList.remove("is-valid");
    city.classList.add("is-invalid");
    return false;
  }
}

// Validate Email using regex
function validateEmail() {
  let email = document.getElementById("email");
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailRegex.test(email.value)) {
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
    return true;
  } else {
    email.classList.remove("is-valid");
    email.classList.add("is-invalid");
    return false;
  }
}

form__data.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    validateName(form__data.firstName) &&
    validateLastName(form__data.lastName) &&
    validateCity(form__data.city) &&
    validateEmail(form__data.email)
  ) {
    alert("Your order has been sent");
    submitOrder();
  } else {
    alert("Please fill all the fields");
    e.preventDefault();
  }
});

// Push Order to the local storage
const pushOrder = function (order) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "Content-type": "application/JSON" },
  })
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      console.log(data.orderId);
      localStorage.setItem("orderId", data.orderId);
      window.location.href = "confirmation.html" + "?id=" + data.orderId;
    });
};

// Submit Order
function submitOrder() {
  const products = [];
  for (product of cart) {
    let productId = product._id;
    products.push(productId);
  }
  const formOrder_Data = {
    name: form__data.firstName.Value,
    lastName: form__data.lastName.Value,
    email: form__data.email.Value,
    address: form__data.address.Value,
    city: form__data.city.Value,
    email: form__data.email.Value,
  };
  let order = {
    products: products,
    formorder_Data: formOrder_Data,
  };
  pushOrder(order);
}

addToCart(cart);
