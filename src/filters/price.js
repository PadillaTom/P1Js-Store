import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (store) => {
  // Seleccionamos:
  const priceInput = getElement('.price-filter');
  const priceValue = getElement('.price-value');

  // Setup Filter:
  let maxPrice = store.map((product) => product.price);
  maxPrice = Math.max(...maxPrice); // SPREAD para no pasar un ARRAY, sino cada item por separado
  //   console.log(maxPrice); // Comprobamos el Price mas caro
  maxPrice = Math.ceil(maxPrice / 100); // Redondeamos para Arriba, Pasamos de Cents a Dolar
  // Cambiamos el default HTML creado previamente:
  priceInput.value = maxPrice; // Value Dynamic para PriceIput
  priceInput.max = maxPrice; // El Max será el Max Price calculado
  priceInput.min = 0; // Minimo price = 0
  priceValue.textContent = `Value: $${maxPrice}`; // Display del Precio MAX

  // Escuchamos por Input (barra)
  priceInput.addEventListener('input', function () {
    // const value = priceInput.value;
    // console.log(typeof value); // Vemos que VALUE ES UNA STRING, queremos pasar a INTEGER
    const value = parseInt(priceInput.value);
    // console.log(value); // Vemos los Integer, en vez de STR, que usaremos para Filtrar
    priceValue.textContent = `Value: $${value}`;
    //
    // Nuevo Array: Store cuyos prices(/100) son Menores o Igual a Value (Numero dado por el Input)
    let newStore = store.filter((product) => product.price / 100 <= value);
    display(newStore, getElement('.product-container'));
    if (newStore.length < 1) {
      const products = getElement('.products-container');
      products.innerHTML = `<h3 class="filter-error"> No Match </h3>`;
    }
  });
};

export default setupPrice;
