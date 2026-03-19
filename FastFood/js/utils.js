function formatCurrency(number) {
  return Number(number || 0).toLocaleString("vi-VN") + " đ";
}

function generateId() {
  return Date.now();
}

function showMessage(message) {
  alert(message);
}

function confirmAction(message) {
  return window.confirm(message);
}

function formatMoney(value) {
  return "$" + Number(value).toFixed(2);
}
