document.addEventListener("DOMContentLoaded", () => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    alert("Bạn cần đăng nhập trước khi xem giỏ hàng.");
    window.location.href = "menu.html";
    return;
  }

  renderCart();

  const clearCartBtn = document.getElementById("clear-cart-btn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const cart = getCart();
      if (cart.length === 0) {
        alert("Giỏ hàng đang trống.");
        return;
      }

      const ok = confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?");
      if (!ok) return;

      saveCart([]);
      renderCart();
      updateCartCount();
    });
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
});

function renderCart() {
  const cartList = document.getElementById("cart-list");
  const cartEmpty = document.getElementById("cart-empty");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  if (!cartList || !cartEmpty || !subtotalEl || !totalEl) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartList.innerHTML = "";
    cartEmpty.style.display = "block";
    subtotalEl.textContent = formatMoney(0);
    totalEl.textContent = formatMoney(0);
    return;
  }

  cartEmpty.style.display = "none";

  cartList.innerHTML = cart
    .map(
      (item) => `
      <div class="col-sm-6 col-lg-4">
        <div class="box" style="margin-top: 25px;">
          <div>
            <div class="img-box">
              <img src="${item.image}" alt="${item.name}" />
            </div>
            <div class="detail-box">
              <h5>${item.name}</h5>
              <p>Giá: ${formatMoney(item.price)}</p>
              <p>Số lượng: ${item.quantity}</p>
              <p>Thành tiền: ${formatMoney(item.price * item.quantity)}</p>

              <div class="options">
                <a href="#" onclick="decreaseQty(${item.productId}); return false;" title="Giảm">
                  -
                </a>

                <a href="#" onclick="increaseQty(${item.productId}); return false;" title="Tăng">
                  +
                </a>

                <a href="#" onclick="removeFromCart(${item.productId}); return false;" title="Xóa">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    )
    .join("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  subtotalEl.textContent = formatMoney(subtotal);
  totalEl.textContent = formatMoney(subtotal);
}

function increaseQty(productId) {
  const cart = getCart();
  const item = cart.find((p) => p.productId === productId);
  if (!item) return;

  item.quantity += 1;
  saveCart(cart);
  renderCart();
  updateCartCount();
}

function decreaseQty(productId) {
  let cart = getCart();
  const item = cart.find((p) => p.productId === productId);
  if (!item) return;

  item.quantity -= 1;

  if (item.quantity <= 0) {
    cart = cart.filter((p) => p.productId !== productId);
  }

  saveCart(cart);
  renderCart();
  updateCartCount();
}

function removeFromCart(productId) {
  const ok = confirm("Bạn có chắc muốn xóa món này khỏi giỏ hàng?");
  if (!ok) return;

  const cart = getCart().filter((item) => item.productId !== productId);
  saveCart(cart);
  renderCart();
  updateCartCount();
}
