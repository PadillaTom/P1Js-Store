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
    //
    // Queremos pasar los Featuerd only ---> Dentro de store buscamos la property of Featured
    const featured = store.filter((product) => product.featured === true);
    // console.log(featured); // Comprobamos que haya productos
    //
    // Display Products Function:
    display(featured, getElement('.featured-center'));
  }
};

// DOM a la Funct INIT
window.addEventListener('DOMContentLoaded', init);
