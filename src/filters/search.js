import { getElement } from '../utils.js';
import display from '../displayProducts.js';

// Main Filter where we need to Display:
const setupSearch = (store) => {
  // Seleccionamos:
  const form = getElement('.input-form');
  const nameInput = getElement('.search-input');
  // Key Up EVENT:
  form.addEventListener('keyup', function () {
    const value = nameInput.value;
    // console.log(value); // Comprobamos Que Funcione
    if (value) {
      const newStore = store.filter((product) => {
        let { name } = product;
        // console.log(name);// Vemos que Cuando Type: Muestra los Products.name
        name = name.toLowerCase(); // Convertimos a Lower para evitar errores
        if (name.startsWith(value)) {
          // ES6 Method --> Comienza con Letra Typed
          return product;
        }
      });
      //   console.log(newStore);// Comprobamos que Tire el nuevo Array con STARTS WITH = value
      display(newStore, getElement('.products-container'));
      if (newStore.length < 1) {
        const products = getElement('.products-container');
        products.innerHTML = `<h3 class="filter-error">No Match</h3>`;
      }
    } else {
      // Si NO HAY VALUE: Mostrar Todo
      display(store, getElement('.products-container'));
    }
  });
};

// Export
export default setupSearch;
