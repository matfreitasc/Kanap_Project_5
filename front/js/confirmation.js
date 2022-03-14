const urlConfirmation = new URL(window.location.href);

const getId = () => {
  console.log(urlConfirmation);
  const getConfirmationId = urlConfirmation.searchParams.get("id");
  console.log(getConfirmationId);
  document.getElementById("orderId").textContent = getConfirmationId;
  localStorage.removeItem("cart");
  localStorage.removeItem("orderId");
};
getId();
