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
// set items

export const addToCart = (id) => {
  // console.log(id); // Vemos la ID del parent Clickeado

  // Abrir Cart una vez Clickeado
  openCart();
};
