import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js"; 
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/backend-practice.js' ; 
//using backend to callback the function in the future ; 
//when this send back the respond immediately execute two functions ; 



Promise.all([
    loadProductsFetch() ,
    new Promise((result)=>{
        loadCart(()=>{
            result() ; 
        }) ; 

    })
]).then((value)=>{
    console.log(value) ; 
    renderOrderSummary() ; 
    renderPaymentSummary() ; 
}) ;




///Promises ,result in param is a function   ;

// new Promise((result)=>{
//     loadProducts(()=>{
//         result('value1') ; 
//     }) ; 
// }).then((value)=>{
//     console.log(value) ; 
//     return new Promise((result)=>{
//         loadCart(()=>{
//             result() ; 
//         }) ; 

//     }) ;  
// }).then(()=>{
//     renderOrderSummary() ; 
//     renderPaymentSummary() ; 
// }); 


//CALLBACK -> this is a big problem when u use them , instead of that let us use promise above to avoid the more nesting codes ; 
///-> let use promises to handle problems ; 
// loadProducts(()=>{
//     loadCart(()=>{
//         renderOrderSummary() ;
//         renderPaymentSummary() ;  
//     }) ; 
// }) ; 
