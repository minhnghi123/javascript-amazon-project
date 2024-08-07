export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: "1",
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: "2",
  },
];

function saveToStorage() {
  //this save a string ;
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addTocart(productId) {
  const valueOfselector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  if (valueOfselector) {
    const quantity = Number(valueOfselector.value);
    let isMatching;
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        isMatching = cartItem;
      }
    });
    if (isMatching) {
      isMatching.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity: quantity,
        deliveryOptionId: "1",
      });
    }
  } else {
    let isMatching;
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        isMatching = cartItem;
      }
    });
    if (isMatching) {
      isMatching.quantity *= 2;
    } else {
      cart.push({
        productId,
        quantity: quantity,
        deliveryOptionId: "1",
      });
    }
  }
  saveToStorage();
}
export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function updateCartQuantity() {
  let numberofProducts = 0;
  cart.forEach((cartItem) => {
    numberofProducts += cartItem.quantity;
  });
  return numberofProducts;
}

export function updateQuantity(productId, newQuantity) {
  let isMatchingItem;
  //find a matching productId in the cart
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      isMatchingItem = cartItem;
    }
  });
  //update its quantity to the new quantity
  isMatchingItem.quantity = Number(newQuantity);
  saveToStorage();
}
export function updateDeliveryOption(productId, deliveryOptionId) {
  let isMatching;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      isMatching = cartItem;
    }
  });
  isMatching.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
export function loadCart(fun) {
  //set up a request and send it into my backend ;
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    fun();
  });
  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send(); //-> asynchronous that means it will send the request but it will not wait for the respond comeback
}
export async function loadCartFetch() {
  const response = await fetch("https://supersimplebackend.dev/cart");
  const text = await response.text();
  console.log(text);
  return text;
}
