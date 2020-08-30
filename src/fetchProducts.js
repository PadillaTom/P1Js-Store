import { allProductsUrl } from './utils.js';

const fetchProducts = async () => {
  // Response de la URL o Error
  const response = await fetch(allProductsUrl).catch((err) => console.log(err));
  //   console.log(response); // Vemos que nos devuelve el URL
  // Return un JSON
  if (response) {
    return response.json(); // Ahora mismo ya podemos acceder a los products (desde el INDEXJS)
  }
  return response;
};

export default fetchProducts;
