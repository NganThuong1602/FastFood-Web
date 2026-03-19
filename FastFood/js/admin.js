document.addEventListener("DOMContentLoaded", () => {
  const currentUser = getCurrentUser();

  if (!currentUser || currentUser.role !== "admin") {
    alert("Chỉ admin mới được truy cập trang này.");
    window.location.href = "menu.html";
    return;
  }

  renderProductTable();
  bindAdminEvents();

  const navSearchBtn = document.getElementById("nav-search-btn");
  if (navSearchBtn) {
    navSearchBtn.addEventListener("click", () => {
      window.location.href = "menu.html";
    });
  }
});

function bindAdminEvents() {
  const form = document.getElementById("product-form");
  const openModalBtn = document.getElementById("open-product-modal-btn");
  const closeModalBtn = document.getElementById("close-product-modal-btn");
  const cancelModalBtn = document.getElementById("cancel-modal-btn");
  const resetFormBtn = document.getElementById("reset-form-btn");
  const overlay = document.getElementById("product-modal-overlay");

  if (form) form.addEventListener("submit", handleFormSubmit);
  if (openModalBtn)
    openModalBtn.addEventListener("click", openProductModalForCreate);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeProductModal);
  if (cancelModalBtn)
    cancelModalBtn.addEventListener("click", closeProductModal);
  if (resetFormBtn) resetFormBtn.addEventListener("click", resetForm);
  if (overlay) overlay.addEventListener("click", closeProductModal);
}

function openProductModalForCreate() {
  resetForm();
  document.getElementById("product-modal-title").textContent = "Thêm sản phẩm";
  document.getElementById("submit-btn").textContent = "Thêm sản phẩm";
  document.getElementById("product-modal").style.display = "block";
}

function openProductModalForEdit() {
  document.getElementById("product-modal").style.display = "block";
}

function closeProductModal() {
  document.getElementById("product-modal").style.display = "none";
  document.getElementById("form-error").textContent = "";
}

function getNextProductId() {
  const products = getProducts();
  if (products.length === 0) return 1;

  const maxId = Math.max(...products.map((item) => Number(item.id) || 0));
  return maxId + 1;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const id = document.getElementById("edit-id").value;
  const name = document.getElementById("name").value.trim();
  const price = Number(document.getElementById("price").value);
  const category = document.getElementById("category").value;
  const status = document.getElementById("status").value;
  const image = document.getElementById("image").value.trim();
  const description = document.getElementById("description").value.trim();
  const errorBox = document.getElementById("form-error");

  errorBox.textContent = "";

  if (!name) {
    errorBox.textContent = "Tên món không được để trống.";
    return;
  }

  if (price <= 0 || Number.isNaN(price)) {
    errorBox.textContent = "Giá phải lớn hơn 0.";
    return;
  }

  if (!category) {
    errorBox.textContent = "Vui lòng chọn loại món.";
    return;
  }

  if (!image) {
    errorBox.textContent = "Vui lòng nhập đường dẫn ảnh.";
    return;
  }

  if (description.length < 5) {
    errorBox.textContent = "Mô tả phải có ít nhất 5 ký tự.";
    return;
  }

  const productData = {
    name,
    price,
    category,
    status,
    image,
    description,
  };

  if (id) {
    updateProduct(Number(id), productData);
    alert("Cập nhật sản phẩm thành công.");
  } else {
    addProduct({
      id: getNextProductId(),
      ...productData,
    });
    alert("Thêm sản phẩm thành công.");
  }

  renderProductTable();
  resetForm();
  closeProductModal();
}

function renderProductTable() {
  const tbody = document.getElementById("product-table-body");
  if (!tbody) return;

  const products = getProducts();

  if (products.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center">Chưa có sản phẩm nào.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = products
    .map(
      (item) => `
      <tr>
        <td>${item.id}</td>
        <td><img src="${item.image}" alt="${item.name}" width="60" /></td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>$${Number(item.price).toFixed(2)}</td>
        <td>${item.status === "available" ? "Còn bán" : "Hết hàng"}</td>
        <td class="admin-col-description">${item.description}</td>
        <td>
          <button class="btn btn-sm btn-warning mb-1 admin-btn-sm" onclick="fillFormForEdit(${item.id})">Sửa</button>
          <button class="btn btn-sm btn-info mb-1 admin-btn-sm" onclick="handleToggleStatus(${item.id})">Đổi trạng thái</button>
          <button class="btn btn-sm btn-danger admin-btn-sm" onclick="handleDelete(${item.id})">Xóa</button>
        </td>
      </tr>
    `,
    )
    .join("");
}

function fillFormForEdit(id) {
  const item = getProductById(id);
  if (!item) return;

  document.getElementById("edit-id").value = item.id;
  document.getElementById("name").value = item.name;
  document.getElementById("price").value = item.price;
  document.getElementById("category").value = item.category;
  document.getElementById("status").value = item.status;
  document.getElementById("image").value = item.image;
  document.getElementById("description").value = item.description;

  document.getElementById("product-modal-title").textContent =
    "Chỉnh sửa sản phẩm";
  document.getElementById("submit-btn").textContent = "Cập nhật sản phẩm";

  openProductModalForEdit();
}

function resetForm() {
  document.getElementById("product-form").reset();
  document.getElementById("edit-id").value = "";
  document.getElementById("submit-btn").textContent = "Thêm sản phẩm";
  document.getElementById("product-modal-title").textContent = "Thêm sản phẩm";
  document.getElementById("form-error").textContent = "";
}

function handleDelete(id) {
  const ok = confirm("Bạn có chắc muốn xóa sản phẩm này?");
  if (!ok) return;

  deleteProduct(id);
  renderProductTable();
  alert("Đã xóa sản phẩm.");
}

function handleToggleStatus(id) {
  toggleProductStatus(id);
  renderProductTable();
}
