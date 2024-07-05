import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js"; 
import { loadProducts } from "../data/products.js";
// import '../data/backend-practice.js' ; 
//using backend to callback the function in the future ; 
//when this send back the respond immediatelly execute two functions ; 
loadProducts(()=>{
    renderOrderSummary()  ;
    renderPaymentSummary()  ;
}) ; 
