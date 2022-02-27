let data = {
  colors: "",
  _id: "",
  name: "",
  price: "",
  imageUrl: "",
  description: "",
  altTxt: "",
  quantity: "",
};

const url = new URL("http://localhost:3000/api/products");

const urlID = new URLSearchParams(window.location.search);
const id = urlID.get("id");

const dropDownColors = document.querySelector("#colors");

fetch(url + "/" + id)
  .then((response) => response.json())
  .then((jsonResponse) => createItem(jsonResponse));

function createItem(data) {
  console.log(data);

  // Change title of the page
  document.querySelector("title").innerHTML = data.name;

  //Product Image
  document.querySelector("#img").innerHTML =
    '<img src="' + data.imageUrl + '" alt="' + data.altTxt + '">';

  //Name of the product
  document.querySelector("#title").innerHTML = data.name;

  //Price of the product
  document.querySelector("#price").innerHTML = data.price;

  //Product Description
  document.querySelector("#description").innerHTML = data.description;

  //Color Dropdown Menu
  addDropDownColors(data.colors);
  dropDownColors.addEventListener("change", (e) => {
    data.colors = e.target.value;
  });

  //Add To Cart Button
  document.querySelector("#addToCart").addEventListener("click", addToCart);

  // Push quantity to the cart
  getItemQuantity(data.value);
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
  quantity.value = value;
  quantity.addEventListener("change", (e) => {
    data.quantity = e.target.value;
  });
}
console.log(data);
