const PRODUCT_KEY = "products";

function getProducts() {
  return JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];
}

function saveProducts(products) {
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
}

function initProducts() {
  const existing = getProducts();
  if (existing.length > 0) return;

  const sampleProducts = [
    {
      id: 1,
      name: "Delicious Pizza",
      description:
        "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: 20,
      category: "Pizza",
      status: "available",
      image: "images/f1.png",
    },
    {
      id: 2,
      name: "Delicious Burger",
      description:
        "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: 15,
      category: "Burger",
      status: "available",
      image: "images/f2.png",
    },
    {
      id: 3,
      name: "Delicious Pizza Special",
      description:
        "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: 17,
      category: "Pizza",
      status: "available",
      image: "images/f3.png",
    },
    {
      id: 4,
      name: "Delicious Pasta",
      description:
        "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: 18,
      category: "Pasta",
      status: "available",
      image: "images/f4.png",
    },
    {
      id: 5,
      name: "French Fries",
      description:
        "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: 10,
      category: "Fries",
      status: "available",
      image: "images/f5.png",
    },
    {
      id: 6,
      name: "Delicious Pizza Cheese",
      description:
        "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: 15,
      category: "Pizza",
      status: "available",
      image: "images/f6.png",
    },
    {
      id: 7,
      name: "Tasty Burger",
      description:
        "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: 12,
      category: "Burger",
      status: "available",
      image: "images/f7.png",
    },
    {
      id: 8,
      name: "Double Tasty Burger",
      description:
        "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: 14,
      category: "Burger",
      status: "available",
      image: "images/f8.png",
    },
    {
      id: 9,
      name: "Delicious Pasta Cream",
      description:
        "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque",
      price: 10,
      category: "Pasta",
      status: "available",
      image: "images/f9.png",
    },
  ];

  localStorage.setItem(PRODUCT_KEY, JSON.stringify(sampleProducts));
}

function addProduct(product) {
  const products = getProducts();
  products.push(product);
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
}

function updateProduct(id, updatedProduct) {
  const products = getProducts().map((item) =>
    item.id === id ? { ...item, ...updatedProduct } : item,
  );
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
}

function deleteProduct(id) {
  const products = getProducts().filter((item) => item.id !== id);
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
}

function getProductById(id) {
  return getProducts().find((item) => item.id === id);
}

function toggleProductStatus(id) {
  const products = getProducts().map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status: item.status === "available" ? "out-of-stock" : "available",
      };
    }
    return item;
  });
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
}

function getCartKey() {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  return `cart_${currentUser.username}`;
}

function getCart() {
  const cartKey = getCartKey();
  if (!cartKey) return [];
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function saveCart(cart) {
  const cartKey = getCartKey();
  if (!cartKey) return;
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function clearCurrentUserCart() {
  const cartKey = getCartKey();
  if (!cartKey) return;
  localStorage.setItem(cartKey, JSON.stringify([]));
}
