export let cart =JSON.parse(localStorage.getItem('cart'))||
[
  {
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6' , 
    quantity: 2
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1 
  }
] ; 



function saveToStorage() {
  //this save a string ;
  localStorage.setItem('cart',JSON.stringify(cart)) ; 
}

export function addTocart(productId) {
    const valueOfselector = document.querySelector(`.js-quantity-selector-${productId}`);
       const quantity = Number(valueOfselector.value);
       let isMatching ; 
       cart.forEach((cartItem)=>{
        if(cartItem.productId === productId ){
            isMatching = cartItem ;
        }
       }) ; 
       if(isMatching){
        isMatching.quantity+= quantity ;
       }
       else{
       cart.push({
         productId,
         quantity :quantity 
       })
    }  
    saveToStorage() ;  
}
 export function removeFromCart(productId) {
   const newCart = [] ; 
   cart.forEach((cartItem)=>{
      if(cartItem.productId!== productId) {
        newCart.push(cartItem) ; 
      }
   }) 
   cart = newCart ; 
   saveToStorage()  ;
  }

export function updateCartQuantity() {
    let numberofProducts = 0 ;
    cart.forEach((cartItem)=>{
        numberofProducts+=cartItem.quantity ;
    }) ;    
    return numberofProducts ; 
}

export function updateQuantity(productId,newQuantity) {
  let isMatchingItem ; 
  //find a matching productId in the cart
  cart.forEach((cartItem)=>{
    if(cartItem.productId === productId) 
      {
        isMatchingItem = cartItem ;
      } 
  }) ; 
  //update its quantity to the new quantity 
  isMatchingItem.quantity = Number(newQuantity) ; 
  saveToStorage()  ;
}