import { updateCartQuantity } from "../../data/cart.js";
export function renderCheckoutHeader() {
    let numberOfProducts_header = updateCartQuantity();
    let formatItem = (numberOfProducts_header>1)?'items':'item' ; 
    let checkOutHeaderHTML ='' ; 
    checkOutHeaderHTML+=
    `Checkout (<a class="return-to-home-link item-quantity-header"
            href="amazon.html">${numberOfProducts_header} ${formatItem}</a>)` ; 
    document.querySelector('.checkout-header-middle-section')
    .innerHTML = checkOutHeaderHTML ;         
}