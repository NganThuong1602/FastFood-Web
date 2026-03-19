document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", renderProducts);
  }

  const navSearchBtn = document.getElementById("nav-search-btn");
  if (navSearchBtn && searchInput) {
    navSearchBtn.addEventListener("click", () => {
      searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
      searchInput.focus();
    });
  }
});

function renderProducts() {
  const menuList = document.getElementById("menu-list");
  if (!menuList) return;

  let products = [...getProducts()];

  const searchInput = document.getElementById("search-input");
  const keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";

  if (keyword) {
    products = products.filter((item) =>
      item.name.toLowerCase().includes(keyword),
    );
  }

  menuList.innerHTML = products
    .map((item) => {
      const categoryClass = item.category.toLowerCase();
      const isAvailable = item.status === "available";

      return `
      <div class="col-sm-6 col-lg-4 all ${categoryClass}">
        <div class="box">
          <div>
            <div class="img-box">
              <img src="${item.image}" alt="${item.name}" />
            </div>
            <div class="detail-box">
              <h5>${item.name}</h5>
              <p>${item.description}</p>

              <p style="margin-bottom: 10px; font-weight: 600; color: ${
                isAvailable ? "#ffffff" : "#ffbe33"
              };">
                ${isAvailable ? "Còn bán" : "Hết hàng"}
              </p>

              <div class="options">
                <h6>$${item.price}</h6>

                ${
                  isAvailable
                    ? `
                  <a href="#" onclick="addToCart(${item.id}); return false;">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 456.029 456.029"
                      style="enable-background: new 0 0 456.029 456.029"
                      xml:space="preserve"
                    >
                      <g>
                        <g>
                          <path d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                          c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"/>
                        </g>
                      </g>
                      <g>
                        <g>
                          <path d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                          C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                          c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                          C457.728,97.71,450.56,86.958,439.296,84.91z"/>
                        </g>
                      </g>
                      <g>
                        <g>
                          <path d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                          c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"/>
                        </g>
                      </g>
                    </svg>
                  </a>
                `
                    : `
                  <a href="#" style="background:#6c757d; pointer-events:none; opacity:0.6;" title="Hết hàng">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 456.029 456.029"
                      style="enable-background: new 0 0 456.029 456.029"
                      xml:space="preserve"
                    >
                      <g>
                        <g>
                          <path d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                          c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"/>
                        </g>
                      </g>
                      <g>
                        <g>
                          <path d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                          C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                          c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                          C457.728,97.71,450.56,86.958,439.296,84.91z"/>
                        </g>
                      </g>
                      <g>
                        <g>
                          <path d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                          c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"/>
                        </g>
                      </g>
                    </svg>
                  </a>
                `
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  refreshIsotope();
}

function refreshIsotope() {
  if (window.jQuery && $(".grid").length) {
    const $grid = $(".grid");

    if ($grid.data("isotope")) {
      $grid.isotope("reloadItems").isotope({
        sortBy: "original-order",
      });
      $grid.isotope("layout");
    } else {
      $grid.isotope({
        itemSelector: ".all",
        percentPosition: false,
        masonry: {
          columnWidth: ".all",
        },
      });
    }
  }
}

function addToCart(productId) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    openAuthModal("login");
    return;
  }

  const product = getProductById(productId);
  if (!product) return;

  if (product.status !== "available") {
    alert("Sản phẩm này hiện đã hết hàng.");
    return;
  }

  const cart = getCart();
  const existing = cart.find((item) => item.productId === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  saveCart(cart);
  updateCartCount();
  alert("Đã thêm vào giỏ hàng");
}
