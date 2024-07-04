class Cart {
    cartItem; 
    #localStorageKey; 
    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey ; 
        this.#loadFromStorage()  ;
        
    }
    #loadFromStorage() {
        this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey)) ; 
        if(!this.cartItem) {
            this.cartItem = [
                {
                  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6' , 
                  quantity: 2,
                  deliveryOptionId :'1'
                },
                {
                  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                  quantity:1,
                  deliveryOptionId :'2'
                }
              ] ; 
        }
    };
    saveToStorage() {
        //this save a string ;
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItem)) ; 
      };
      addTocart(productId) {
        let isMatching ; 
        this.cartItem.forEach((cartItem)=>{
         if(cartItem.productId === productId ){
             isMatching = cartItem ;
         }
        }) ; 
        if(isMatching){
         isMatching.quantity+= 1 ;
        }
        else{
        this.cartItem.push({
          productId,
          quantity :1, 
          deliveryOptionId: '1'
        })
     }  
     this.saveToStorage() ;  
 } ;
 removeFromCart(productId) {
    const newCart = [] ; 
    this.cartItem.forEach((cartItem)=>{
       if(cartItem.productId!== productId) {
         newCart.push(cartItem) ; 
       }
    }) 
    this.cartIte = newCart ; 
    this.saveToStorage()  ;
   } ;
   updateDeliveryOption(productId, deliveryOptionId) {
    let isMatching ; 
      this.cartItem.forEach((cartItem)=>{
      if(cartItem.productId === productId ){
          isMatching = cartItem ;
      }
    }) ; 
    isMatching.deliveryOptionId = deliveryOptionId ; 
    this.saveToStorage() ; 
  };
  updateCartQuantity() {
    let numberofProducts = 0 ;
    this.cartItem.forEach((cartItem)=>{
        numberofProducts+=cartItem.quantity ;
    }) ;    
    return numberofProducts ; 
  };

  updateQuantity(productId,newQuantity) {
    let isMatchingItem ; 
    //find a matching productId in the cart
    this.cartItem.forEach((cartItem)=>{
      if(cartItem.productId === productId) 
        {
          isMatchingItem = cartItem ;
        } 
    }) ; 
    //update its quantity to the new quantity 
    isMatchingItem.quantity = Number(newQuantity) ; 
    this.saveToStorage()  ;
  }
}
  const cart = new Cart('cart-oop'); 
  const business = new Cart('cart-business')  ;
  console.log(cart) ; 
  console.log(business) ; 
  console.log(business instanceof Cart) ; 
  
  
  
  
  