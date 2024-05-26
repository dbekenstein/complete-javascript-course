// exporting module

console.log('Exporting Module');

// blocking code. this will block the script.js from loading until it completes. risk of using top level await
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish fetching users');

const shippingCost = 10;
const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

// export many thins at once
const totalPrice = 237;
const totalQuantity = 23;

export { cart, totalPrice, totalQuantity as tq };

// default exports
// in import file, "import (name) from './shoppingCart.js"
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
