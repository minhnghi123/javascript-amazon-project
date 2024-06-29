export const cart =[] ; 
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
}
