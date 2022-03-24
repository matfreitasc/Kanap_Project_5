const url = new URL("http://localhost:3000/api/products");

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

let cart__items = document.querySelector("#cart__items");

function addToCart() {
  for (i = 0; i < cart.length; i++) {
    let itemArticle = document.createElement("article");
    itemArticle.classList.add("cart__item");
    itemArticle.setAttribute("data-id", cart[i]._id);
    itemArticle.setAttribute("data-colors", cart[i].colors);
    cart__items.appendChild(itemArticle);

    fetch(url + "/" + cart[i]._id)
      .then((response) => response.json())
      .then((data) => {
        itemPrice = data.price;
      })
      .catch((error) => console.log(error));

    for (let x = 0; x < cart.length; x++) {
      Price = cart[x].price;
    }

    itemArticle.innerHTML = `
          <div class="cart__item__img">
          <img src="${cart[i].imageUrl}" alt="${cart[i].altTxt}" />
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${cart[i].name}</h2>
            <p>${cart[i].colors}</p>
            <p>€: ${Price}</p>
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

    if (cart.length === 0 || cart === null) {
      totalQuantity.innerHTML = "0";
      cart__items.innerHTML = "No items in your cart";
    } else {
      total = cart.reduce((preValue, CurrentValue) => {
        return {
          quantity:
            parseInt(preValue.quantity, 10) +
            parseInt(CurrentValue.quantity, 10),
        };
      });
      totalQuantity.innerHTML = total.quantity;
    }
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
  }
  getTotalPrice();
}

addToCart(cart);
// form Validation
const form__data = document.getElementsByClassName("cart__order__form")[0];

// Validate First Name using regex
function validateName() {
  let name = document.getElementById("firstName");
  let nameErr = document.getElementById("firstNameErrorMsg");
  let nameRegex = /^[a-zA-Z]{2,}$/;
  if (nameRegex.test(name.value)) {
    name.classList.remove("is-invalid");
    name.classList.add("is-valid");
    nameErr.innerHTML = "";
    return true;
  } else {
    name.classList.remove("is-valid");
    name.classList.add("is-invalid");
    nameErr.innerHTML = "Please enter a valid first name";
    return false;
  }
}

// Validate Last Name using regex
function validateLastName() {
  let lastName = document.getElementById("lastName");
  let lastNameErr = document.getElementById("lastNameErrorMsg");
  let lastNameRegex = /^[a-zA-Z]{2,}$/;
  if (lastNameRegex.test(lastName.value)) {
    lastName.classList.remove("is-invalid");
    lastName.classList.add("is-valid");
    lastNameErr.innerHTML = "";
    return true;
  } else {
    lastName.classList.remove("is-valid");
    lastName.classList.add("is-invalid");
    lastNameErr.innerHTML = "Please enter a valid last name";
    return false;
  }
}

// Validate home address using regex
function validateAddress() {
  let address = document.getElementById("address");
  let addressErr = document.getElementById("addressErrorMsg");
  let addressRegex = /^\s*\S+(?:\s+\S+){2}/;
  if (addressRegex.test(address.value)) {
    address.classList.remove("is-invalid");
    address.classList.add("is-valid");
    addressErr.innerHTML = "";
    return true;
  } else {
    address.classList.remove("is-valid");
    address.classList.add("is-invalid");
    addressErr.innerHTML = "Please enter a valid address";

    return false;
  }
}
// Validate city using regex
function validateCity() {
  let city = document.getElementById("city");
  let cityErr = document.getElementById("cityErrorMsg");
  let cityRegex = /^[a-zA-Z]{2,}$/;
  if (cityRegex.test(city.value)) {
    city.classList.remove("is-invalid");
    city.classList.add("is-valid");
    cityErr.innerHTML = "";
    return true;
  } else {
    city.classList.remove("is-valid");
    city.classList.add("is-invalid");
    cityErr.innerHTML = "Please enter a valid city";

    return false;
  }
}

// Validate Email using regex
function validateEmail() {
  let email = document.getElementById("email");
  let emailErr = document.getElementById("emailErrorMsg");
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailRegex.test(email.value)) {
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
    emailErr.innerHTML = "";
    return true;
  } else {
    email.classList.remove("is-valid");
    email.classList.add("is-invalid");
    emailErr.innerHTML = "Please enter a Valid Email Address";

    return false;
  }
}

//  Add a form listener to validate the form on keyup or blur
form__data.firstName.addEventListener("keyup", validateName);
form__data.firstName.addEventListener("blur", validateName);
form__data.lastName.addEventListener("blur", validateLastName);
form__data.lastName.addEventListener("keyup", validateLastName);
form__data.address.addEventListener("keyup", validateAddress);
form__data.address.addEventListener("blur", validateAddress);
form__data.city.addEventListener("keyup", validateCity);
form__data.city.addEventListener("blur", validateCity);
form__data.email.addEventListener("keyup", validateEmail);
form__data.email.addEventListener("blur", validateEmail);

// send data to local storage
form__data.addEventListener("submit", (e) => {
  e.preventDefault();

  let products = [];

  for (let i = 0; i < cart.length; i++) {
    products.push(cart[i]._id);
  }
  let contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
  };

  let data = {
    contact: contact,
    products: products,
  };

  if (
    validateName() &&
    validateLastName() &&
    validateAddress() &&
    validateCity() &&
    validateEmail() &&
    cart.length > 0
  ) {
    pushData(data);
  } else {
    alert("No items in cart");
  }
});

const pushData = (data) => {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("orderId", data.orderId);

      window.location.href = "confirmation.html" + "?id=" + data.orderId;
    })
    .catch((err) => {
      console.log(err);
    });
};
