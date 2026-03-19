document.addEventListener("DOMContentLoaded", () => {
  if (typeof initProducts === "function") {
    initProducts();
  }

  if (typeof initUsers === "function") {
    initUsers();
  }

  updateCartCount();
  setActiveNav();
});

function updateCartCount() {
  const currentUser =
    typeof getCurrentUser === "function" ? getCurrentUser() : null;

  let totalQty = 0;

  if (currentUser && typeof getCart === "function") {
    const cart = getCart();
    totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  const cartCountById = document.getElementById("cart-count");
  if (cartCountById) {
    cartCountById.textContent = totalQty;
  }
}

const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.addEventListener("input", renderProducts);
}

const navSearchBtn = document.getElementById("nav-search-btn");
if (navSearchBtn) {
  navSearchBtn.addEventListener("click", () => {
    window.location.href = "menu.html";
    searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
    searchInput.focus();
  });
}

function setActiveNav() {
  const currentPage = location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const parent = link.closest(".nav-item");
    if (!parent) return;

    parent.classList.remove("active");

    if (href === currentPage) {
      parent.classList.add("active");
    }
  });
}
