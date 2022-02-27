// Connection with the database is done in the following function 
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((jsonResponse) => createProductCards(jsonResponse));

function createProductCards(productCards) {
  console.log(productCards);
  // Finish this function
}
