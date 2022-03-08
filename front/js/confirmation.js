const urlConfirmation = new URL(window.location.href);

const getId = () => {
  console.log(urlConfirmation);
  const getConfirmationId = urlConfirmation.searchParams.get("id");
  console.log(getConfirmationId);
  document.getElementById("orderId").textContent = getConfirmationId;
};
getId();

localStorage.removeItem("productt");
localStorage.removeItem("orderId");
