import {
  cart,
  removeFromCart,
  updateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate,
} from "../../data/deliveryOptions.js";
//default export from external library
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
export function renderOrderSummary() {
  let cartSumaryHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    //get full in4 of product
    const matchingProduct = getProduct(productId);
    //get full in4 of deliveryOption
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const dateString = calculateDeliveryDate(deliveryOption);
    cartSumaryHTML += `<div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name} 
                </div>
                <div class="product-price">
                    ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct}">${
      cartItem.quantity
    }</span>
                    </span>
                    <span class="update-quantity-link link-primary 
                    js-update-link"
                    data-product-id = "${matchingProduct.id}"
                    >
                    Update
                    </span>
                    <input class="quantity-input js-quantity-input-${
                      matchingProduct.id
                    }">
                    <span class="save-quantity-link link-primary js-save-quantity-link-${
                      matchingProduct.id
                    }">Save</span>
                    <span class="delete-quantity-link link-primary
                    js-delete-link
                    " data-product-id ="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
            
                </div>
            </div>
            </div>
        `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)}-`;
      let isCheck = deliveryOption.id === cartItem.deliveryOptionId;
      html += `<div class="delivery-option js-delivery-option" data-product-id ="${
        matchingProduct.id
      }" data-delivery-id ="${deliveryOption.id}">
                <input type="radio"
                ${isCheck ? "checked" : ""}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>
            `;
    });
    return html;
  }

  // load all products in cart on the page
  document.querySelector(".js-order-summary").innerHTML = cartSumaryHTML;

  // update checkout( numberOfProducts)
  renderCheckoutHeader();

  // make the delete interactive
  deleteItems(null);
  function deleteItems(productId) {
    if (productId) {
      removeFromCart(productId);
      renderOrderSummary();
    } else {
      document.querySelectorAll(".js-delete-link").forEach((link) => {
        link.addEventListener("click", () => {
          const productId = link.dataset.productId;
          removeFromCart(productId);
          renderOrderSummary();
          renderPaymentSummary();
        });
      });
    }
  }

  //processing of saveQuantity function (divided smaller function to be easy organized)

  function processingOfsaveQuantity(productId, container) {
    container.classList.remove("is-editing-quantity");
    const changedQuantity = document.querySelector(
      `.js-quantity-input-${productId}`
    ).value;
    //check the valid quantity
    if (Number(changedQuantity) >= 0 && Number(changedQuantity) < 1000) {
      if (!Number(changedQuantity)) {
        deleteItems(productId);
      } else {
        //update on quantity-label
        updateQuantity(productId, changedQuantity);
      }
    } else {
      alert("Quantity must be at least 0 and less than 1000");
      return;
    }

    //load the pages
    renderOrderSummary();
    //when update let update on paymentsummary
    renderPaymentSummary();
  }
  // /make the save interactive
  function saveQuantity(productId, container) {
    //add event keydown when you press Enter key
    document
      .querySelector(`.js-quantity-input-${productId}`)
      .addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          processingOfsaveQuantity(productId, container);
        }
      });
    //add event click when you want to click the save
    document
      .querySelector(`.js-save-quantity-link-${productId}`)
      .addEventListener("click", () => {
        processingOfsaveQuantity(productId, container);
      });
  }
  //make the update interactive
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
      //make the save interactive
      saveQuantity(productId, container);
    });
  });
  //make the deliveryOptions interactive
  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      const { productId, deliveryId } = option.dataset;
      updateDeliveryOption(productId, deliveryId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
