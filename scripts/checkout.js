import {cart,removeFromCart,updateCartQuantity,updateQuantity} from '../data/cart.js' ; 
import { products } from '../data/products.js';  
import { formatCurrency } from './utils/money.js';
let cartSumaryHTML = '' ;

cart.forEach((cartItem)=>{
    const productId = cartItem.productId ; 
    let matchingProduct ; 
    products.forEach((product)=>{
        if(product.id === productId) matchingProduct = product ; 
    }) ; 
    
    cartSumaryHTML+=`<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name} 
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary 
                js-update-link"
                data-product-id = "${matchingProduct.id}"
                >
                Update
                </span>
                <input class="quantity-input">
                <span class="save-quantity-link link-primary">Save</span>
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
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    `
   
}) ;  
// load all products in cart on the page
document.querySelector('.js-order-summary')
.innerHTML = cartSumaryHTML ; 

// update checkout( numberOfProducts)
setHeader() ; 
function setHeader() {
    let numberOfProducts_header = updateCartQuantity();
    let formatItem = (numberOfProducts_header>1)?'items':'item' ; 
    document.querySelector('.item-quantity-header')
    .innerHTML = `${numberOfProducts_header} ${formatItem}` ; 
}

// make the delete interactive
deleteItems(null)  ;
function deleteItems(productId){

    if(productId) {
        removeFromCart(productId) ; 
        const container =  document.querySelector(`.js-cart-item-container-${productId}`) ; 
        container.remove() ; 
        setHeader()  ;
    }
    else {
    document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
        link.addEventListener('click',()=>{
        const productId  = link.dataset.productId ; 
        removeFromCart(productId) ; 
        const container =  document.querySelector(`.js-cart-item-container-${productId}`) ; 
        container.remove() ; 
        setHeader()  ;
    }) ; 
    }) ; 
    }
}

//processing of saveQuantity function (divided smaller function to be easy organized)

function processingOfsaveQuantity(productId,container) {
    container.classList.remove('is-editing-quantity') ;
            const changedQuantity = document.querySelector('.quantity-input').value ;
            //check the valid quantity
            if(Number(changedQuantity)>=0 && Number(changedQuantity)<1000){
                if(!Number(changedQuantity)) {
                    deleteItems(productId) ; 
                }
                else {
                //update on quantity-label
                document.querySelector('.quantity-label')
                .innerHTML =  Number(changedQuantity) ;  
                updateQuantity(productId,changedQuantity) ; 
                setHeader()   ; 
                }
            }
            else {
                alert('Quantity must be at least 0 and less than 1000');
                return;
            }
}

// /make the save interactive
function saveQuantity(productId,container) {
    //add event keydown when you press Enter key
    document.querySelectorAll('.quantity-input')
    .forEach((link)=>{
    link.addEventListener('keydown',(event)=>{
        if(event.key ==='Enter') {
            processingOfsaveQuantity(productId,container) ; 
        }
    });
    
    });
    //add event click when you wanan click the save
    document.querySelectorAll('.save-quantity-link')
    .forEach((link)=>{
        link.addEventListener('click',()=>{
            processingOfsaveQuantity(productId,container) ; 
        }) ; 
    })
}

//make the update interactive 
document.querySelectorAll('.js-update-link')
.forEach((link)=>{
   link.addEventListener('click',()=>{
    const productId = link.dataset.productId ; 
    const container =  document.querySelector(`.js-cart-item-container-${productId}`) ; 
    container.classList.add('is-editing-quantity') ;
    //make the save interactive
    saveQuantity(productId,container) ; 
   }) ; 
}) ; 



