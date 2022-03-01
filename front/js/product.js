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
console.log(cart);

const url = new URL("http://localhost:3000/api/products");

const urlID = new URLSearchParams(window.location.search);
const id = urlID.get("id");

const dropDownColors = document.querySelector("#colors");

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
  document.querySelector("#addToCart").addEventListener("click", addToCart);

  // Push quantity to the cart
  getItemQuantity(itemData.value);
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
function getItemQuantity(value) {
  let quantity = document.querySelector("#quantity");
  quantity.addEventListener("input", (e) => {
    itemData.quantity = e.target.value;
  });
}

function addToCart(e) {
  let pushedItem = true;

  if (cart.length === 0) {
  } else
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id === itemData._id && cart[i].colors === itemData.colors) {
        cart[i].quantity = itemData.quantity;
        pushedItem = false;
      }
    }

  if (pushedItem) {
    cart.push(itemData);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
}
