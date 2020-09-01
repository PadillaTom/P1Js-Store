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
  } else {
    // Update Values :
    const amount = increaseAmount(id);
    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
    // console.log(items); // Vemos la Node List pasada a Array
    // SI el item del array comparte ID: Mostrar como Text Content
    const newAmount = items.find((value) => value.dataset.id === id);
    newAmount.textContent = amount;
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
//
function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      // Si matchea el ID
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount }; // Tomamos el Cart Item y le acregamos 1 a su amount
    }
    return cartItem; // IF NOT
  });
  return newAmount;
}
//
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      // Si matchea el ID
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount }; // Tomamos el Cart Item y le acregamos 1 a su amount
    }
    return cartItem; // IF NOT
  });
  return newAmount;
}
//
function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount); // Se le va sumando al Total cada AMOUNT de los Items
  }, 0); // Comenzando por aqui
  // Add to DOM:
  cartItemCountDOM.textContent = amount;
}
//
function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount); // total price*amount Para cada item
  }, 0);
  cartTotalDOM.textContent = `Total: ${formatPrice(total)}`;
}
//
function setupCartFunctionality() {
  cartItemsDOM.addEventListener('click', function (e) {
    //Buscar al Parent ( Siempre que tenemos Icons)
    const element = e.target;
    // console.log(element); // Comprobamos la Seleccion
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;
    // Remove CART and DOM:
    if (element.classList.contains('cart-item-remove-btn')) {
      removeItem(id);
      parent.parentElement.remove();
    }
    //Increase DOM:
    if (parent.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentID);
      console.log(newAmount);
      parent.nextElementSibling.textContent = newAmount;
    }
    //Decrease
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentID);
      console.log(newAmount);
      if (newAmount === 0) {
        removeItem(id);
        parent.parentElement.parentElement.remove(); // Removemos por completo el Item
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    //
    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart', cart); // Storage of CART
  });
}
// Remove Item: FROM CART NOT DOM
function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}
//
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
  setupCartFunctionality();
};
init();
