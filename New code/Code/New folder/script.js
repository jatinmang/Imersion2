let currentProducts = [];

// Load all products on page load
window.onload = async function () {
  try {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    currentProducts = data.products;
    displayProducts(currentProducts);
  } catch (error) {
    document.getElementById('errorMsg').textContent = "Failed to load products.";
  }
};

// Search for products by name
async function searchProduct() {
  const query = document.getElementById('searchInput').value.trim();
  const errorMsg = document.getElementById('errorMsg');
  errorMsg.textContent = "";

  if (query === "") {
    errorMsg.textContent = "Search field cannot be empty.";
    return;
  }

  try {
    const res = await fetch(https://dummyjson.com/products/search?q=${encodeURIComponent(query)});
    const data = await res.json();
    currentProducts = data.products;

    if (currentProducts.length === 0) {
      document.getElementById('productResults').innerHTML = "<p>No products found.</p>";
    } else {
      displayProducts(currentProducts);
    }

  } catch (error) {
    errorMsg.textContent = "Error fetching products.";
  }
}

// Display all product cards
function displayProducts(products) {
  const resultBox = document.getElementById('productResults');
  resultBox.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <div class="product-title">${product.title}</div>
      <div class="product-brand"><strong>Brand:</strong> ${product.brand}</div>
      <div class="product-category"><strong>Category:</strong> ${product.category}</div>
      <div class="product-description">${product.description}</div>
      <div class="product-price">₹${product.price}</div>
    `;

    resultBox.appendChild(card);
  });
}

// Sort products by price
function sortProducts() {
  const sortType = document.getElementById("sortSelect").value;

  if (currentProducts.length === 0) return;

  if (sortType === "low-to-high") {
    currentProducts.sort((a, b) => a.price - b.price);
  } else if (sortType === "high-to-low") {
    currentProducts.sort((a, b) => b.price - a.price);
  }

  displayProducts(currentProducts);
}