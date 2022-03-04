let itemData = {
  colors: "",
  _id: "",
  name: "",
  price: "",
  imageUrl: "",
  description: "",
  altTxt: "",
  quantity: 1,
};

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

const url = new URL("http://localhost:3000/api/products");

const urlID = new URLSearchParams(window.location.search);
const id = urlID.get("id");

const dropDownColors = document.querySelector("#colors");
let addToCartButton = document.querySelector("#addToCart");
let quantity = document.querySelector("#quantity");

fetch(url + "/" + id)
  .then((response) => response.json())
  .then((data) => {
    itemData = data;
    createItem(data);
  })
  .catch((error) => console.log("Fetch Error.", error));

function createItem(itemData) {
  // Change title of the page
  document.querySelector("title").innerHTML = itemData.name;

  //Product Image
  document.querySelector("#img").innerHTML =
    '<img src="' + itemData.imageUrl + '" alt="' + itemData.altTxt + '">';

  //Name of the product
  document.querySelector("#title").innerHTML = itemData.name;

  //Price of the product
  document.querySelector("#price").innerHTML = itemData.price;

  //Product Description
  document.querySelector("#description").innerHTML = itemData.description;

  //Color Dropdown Menu
  addDropDownColors(itemData.colors);
  dropDownColors.addEventListener("change", (e) => {
    itemData.colors = e.target.value;
  });

  //Add To Cart Button
  addToCartButton.addEventListener("click", addToCart);

  // Push quantity to the cart
  getItemQuantity(itemData.quantity);
}
// Add colors to the dropdown menu
function addDropDownColors(colors) {
  colors.forEach((color) => {
    let option = document.createElement("option");
    option.value = color;
    option.innerHTML = color;
    dropDownColors.appendChild(option);
  });
}

// Handle quanity of the product
function getItemQuantity() {
  quantity.addEventListener("input", (e) => {
    itemData.quantity = e.target.value;
  });
}

function addToCart(e) {
  let sentToCart = true;
  cart.forEach((item) => {
    if (item._id === itemData._id && item.colors == itemData.colors) {
      item.quantity = itemData.quantity;
      sentToCart = false;
    }
  });
  if (sentToCart) {
    cart.push(itemData);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  addToCartNotification();
}

// Add to cart button notificaiton
function addToCartNotification() {
  let added_notification = document.createElement("div");
  added_notification.classList.add("add_to_cart_notification");
  // add to cart notification
  added_notification.innerHTML = `
    Your Item has been added to the cart!
      `;
  document.querySelector(".item").appendChild(added_notification);
  setTimeout(() => {
    added_notification.remove();
  }, 2000);
}
