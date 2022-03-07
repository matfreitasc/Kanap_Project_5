// Get order ID from post order and display on the confirmation page

const getUrlConfirmation = new URL(window.location.href);
console.log(getUrlConfirmation);

const getId = () => {
  const getConfirmationId = getUrlConfirmation.searchParams.get("id");
  document.querySelector("#orderId").innerHTML = getConfirmationId;
};
getId();
// localStorage.removeItem("cart");
