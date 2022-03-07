// Get order ID from post order and display on the confirmation page

const getID = () => {
  const urlID = new URLSearchParams(window.location.search);
  const id = urlID.get("id");
  document.querySelector("#orderID").innerHTML = id;
};
getID();

localStorage.removeItem("cart");
