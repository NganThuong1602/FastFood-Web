const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

function saveCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

function initUsers() {
  const users = getUsers();
  if (users.length > 0) return;

  const defaultUsers = [
    {
      username: "admin",
      phone: "0123456789",
      password: "admin123",
      role: "admin",
    },
  ];

  saveUsers(defaultUsers);
}

function openAuthModal(defaultTab = "login") {
  const modal = document.getElementById("auth-modal");
  if (!modal) return;
  modal.style.display = "block";
  switchAuthTab(defaultTab);
}

function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (!modal) return;
  modal.style.display = "none";
  clearAuthMessage();
}

function clearAuthMessage() {
  const msg = document.getElementById("auth-message");
  if (msg) msg.textContent = "";
}

function switchAuthTab(tab) {
  const loginWrap = document.getElementById("login-form-wrap");
  const registerWrap = document.getElementById("register-form-wrap");
  const loginTab = document.getElementById("show-login-tab");
  const registerTab = document.getElementById("show-register-tab");

  if (!loginWrap || !registerWrap || !loginTab || !registerTab) return;

  if (tab === "login") {
    loginWrap.style.display = "block";
    registerWrap.style.display = "none";
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
  } else {
    loginWrap.style.display = "none";
    registerWrap.style.display = "block";
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
  }

  clearAuthMessage();
}

function updateAuthUI() {
  const currentUser = getCurrentUser();
  const adminNavItem = document.getElementById("admin-nav-item");
  const userIconBtn = document.getElementById("user-icon-btn");

  if (adminNavItem) {
    adminNavItem.style.display =
      currentUser && currentUser.role === "admin" ? "" : "none";
  }

  if (userIconBtn) {
    if (currentUser) {
      userIconBtn.title = "Đăng xuất: " + currentUser.username;
    } else {
      userIconBtn.title = "Đăng nhập / Đăng ký";
    }
  }

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
}

function handleLogin() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const msg = document.getElementById("auth-message");

  const users = getUsers();
  const found = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!found) {
    msg.textContent = "Sai tên đăng nhập hoặc mật khẩu.";
    return;
  }

  saveCurrentUser({
    username: found.username,
    phone: found.phone,
    role: found.role,
  });

  closeAuthModal();
  updateAuthUI();
  alert("Đăng nhập thành công.");
}

function handleRegister() {
  const username = document.getElementById("register-username").value.trim();
  const phone = document.getElementById("register-phone").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const msg = document.getElementById("auth-message");

  if (!username || !phone || !password) {
    msg.textContent = "Vui lòng nhập đầy đủ thông tin.";
    return;
  }

  const users = getUsers();
  const existed = users.find((u) => u.username === username);

  if (existed) {
    msg.textContent = "Tên đăng nhập đã tồn tại.";
    return;
  }

  users.push({
    username,
    phone,
    password,
    role: "customer",
  });

  saveUsers(users);

  saveCurrentUser({
    username,
    phone,
    role: "customer",
  });

  closeAuthModal();
  updateAuthUI();
  alert("Đăng ký thành công.");
}

function requireLoginThenGoCart() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    openAuthModal("login");
    return;
  }

  window.location.href = "cart.html";
}

document.addEventListener("DOMContentLoaded", () => {
  initUsers();
  updateAuthUI();

  const userIconBtn = document.getElementById("user-icon-btn");
  const closeBtn = document.getElementById("auth-close-btn");
  const overlay = document.getElementById("auth-overlay");
  const loginTab = document.getElementById("show-login-tab");
  const registerTab = document.getElementById("show-register-tab");
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");

  const cartNavLink = document.getElementById("cart-nav-link");
  const cartIconLink = document.getElementById("cart-icon-link");

  if (userIconBtn) {
    userIconBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const currentUser = getCurrentUser();

      if (currentUser) {
        const ok = confirm(`Đăng xuất tài khoản ${currentUser.username}?`);
        if (ok) {
          handleLogoutFlow();
        }
      } else {
        openAuthModal("login");
      }
    });
  }

  if (cartNavLink) {
    cartNavLink.addEventListener("click", function (e) {
      e.preventDefault();
      requireLoginThenGoCart();
    });
  }

  if (cartIconLink) {
    cartIconLink.addEventListener("click", function (e) {
      e.preventDefault();
      requireLoginThenGoCart();
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeAuthModal);
  if (overlay) overlay.addEventListener("click", closeAuthModal);
  if (loginTab)
    loginTab.addEventListener("click", () => switchAuthTab("login"));
  if (registerTab)
    registerTab.addEventListener("click", () => switchAuthTab("register"));
  if (loginBtn) loginBtn.addEventListener("click", handleLogin);
  if (registerBtn) registerBtn.addEventListener("click", handleRegister);
});

function handleLogoutFlow() {
  logoutUser();
  updateAuthUI();

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }

  const currentPage = location.pathname.split("/").pop().toLowerCase();

  if (currentPage === "admin.html" || currentPage === "cart.html") {
    window.location.href = "index.html";
    return;
  }

  window.location.href = "index.html";
}
