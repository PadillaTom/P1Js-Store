// global imports for all Pages --> Con REACT ya no tendremos necesidad, ES como COPY PASTE
import './src/toggleSidebar.js'; // Importamos Modulo y se ejectua instantaneamente.
import './src/cart/toggleCart.js';
import './src/cart/setupCart.js';
// specific imports
import fetchProducts from './src/fetchProducts.js';
import { setupStore, store } from './src/store.js';
import display from './src/displayProducts.js';
import { getElement } from './src/utils.js';

// Init Function:
const init = async () => {
  const products = await fetchProducts(); // Esperará a la Function
  //   console.log(products); // Una vez convertida la response del API a JSON podemos acceder

  if (products) {
    // Add Products to Store --->
    setupStore(products);
    // console.log(store);
  }
};

// DOM a la Funct INIT
window.addEventListener('DOMContentLoaded', init);
