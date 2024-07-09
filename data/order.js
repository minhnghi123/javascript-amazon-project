export let orders = JSON.parse(localStorage.getItem("orders")) || [];
export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}
function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
export function removeFromOrders(orderId) {
  let tmp = [];
  orders.forEach((order) => {
    if (order.id !== orderId) {
      tmp.push(order);
    }
  });
  orders = tmp;
  saveToStorage();
}
orders.forEach((order) => {
  console.log(order.id);
});
export function getOrder(orderId) {
  let matchingOrder;
  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });
  return matchingOrder;
}
