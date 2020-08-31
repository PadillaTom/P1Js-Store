// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
//
// Set items ------------->
const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');
//
// CART in STORAGE:
let cart = getStorageItem('cart'); // Levamtanmos el Cart

export const addToCart = (id) => {
  // console.log(id); // Vemos la ID del parent Clickeado
  // Tengo el Item en el Cart already?
  let item = cart.find((cartItem) => cartItem.id === id);
  // console.log(item); // Vemos Undefined porque TODAVIA NO LO PUSHEAMOS
  if (!item) {
    // Find the Product (Object)
    let product = findProduct(id);
    // console.log(product); // Vemos el Product
    // Add the FOUND product to Cart Array
    product = { ...product, amount: 1 }; // Pasamos TODA la info del Product, agregando Amount:1
    cart = [...cart, product]; // Add all the cart + product Found
    // console.log(cart); //Vemos como se agrega el Item al Array
    // Add to the DOM:
    addToCartDOM(product);
  }
  //
  //Add 1 to Amount:
  displayCartItemCount();
  //
  // Calculate Totals: and Display
  displayCartTotal();
  //
  // Set our CART to LOCAL STORAGE
  setStorageItem('cart', cart);
  //
  // Abrir Cart una vez Clickeado
  openCart();
};

// Functions:
function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount); // Se le va sumando al Total cada AMOUNT de los Items
  }, 0); // Comenzando por aqui
  // Add to DOM:
  cartItemCountDOM.textContent = amount;
}
function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount); // total price*amount Para cada item
  }, 0);
  cartTotalDOM.textContent = `Total: ${formatPrice(total)}`;
}
function setupCartFunctionality() {}

function displayCartItemsDOM() {
  // Muestra el Amount de items en el Carrito, por todas las Paginas
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}
//
// Dicha Function CORRERA en todas las Paginas (mostrar el Cart tomado desde la Storage)
const init = () => {
  // console.log(cart); // Vemos el Cart
  //
  // Display Amount of Cart Items:
  displayCartItemCount();
  //
  // Display Totals:
  displayCartTotal();
  //
  // Add All Cart Items to DOM:
  displayCartItemsDOM();
  //
  // BTNS Functionality:
};
init();
