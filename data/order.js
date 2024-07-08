export const orders = JSON.parse(localStorage.getItem("orders")) || [];
export function addOrder(order) {
  orders.unshift(order);
  saveToStorge();
}
function saveToStorge() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
