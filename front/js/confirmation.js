const urlConfirmation = new URL(window.location.href);

const getId = () => {
  const getConfirmationId = urlConfirmation.searchParams.get("id");
  document.getElementById("orderId").textContent = getConfirmationId;
  localStorage.removeItem("cart");
  localStorage.removeItem("orderId");
};
getId();
