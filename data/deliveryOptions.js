//default export from external library
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js' ; 
export const deliveryOptions =[{
    id :'1',
    deliveryDays :7,
    priceCents: 0 
},{
    id:'2',
    deliveryDays:3,
    priceCents:499
},
{
    id:'3',
    deliveryDays:1,
    priceCents:999
}
] ; 

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption ;
    deliveryOptions.forEach((option)=>{
        if(option.id === deliveryOptionId){
            deliveryOption = option ;
        }
    }
    ) ; 
    return deliveryOption || deliveryOptions[0] ; 
}
function isWeekend(deliveryDate) {
    const dateString = deliveryDate.format('dddd') ; 
    return (dateString==='Saturday') || (dateString==='Sunday') ; 
}
export function calculateDeliveryDate(deliveryOption) {
    let today = dayjs() ; //->object
    // const deliveryDate = today.add(deliveryOption.deliveryDays,'days') ; //object
    //some shop don't delivery at weekend so we have to skip it through a loop
    let remainingDays = deliveryOption.deliveryDays ; 
    while(remainingDays>0){
        today = today.add(1,'day') ; 
        if(!isWeekend(today)) remainingDays-- ; 
    }
    const dateString = today.format('dddd, MMMM, D, YYYY') ; 
    return dateString ; 
}