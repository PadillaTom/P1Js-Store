import { getStorageItem, setStorageItem } from './utils.js';
//
// Empty array donde pushearemos los products y la que los DISPLAY
let store = [];
//
// Pasamos los productos:
const setupStore = (products) => {
  store = products.map((product) => {
    // console.log(product); // Comprobamos cada Product Individual
    // Destructure el Object:
    const {
      // Seleccionamos ID
      id,
      // Dentro de FIELDS, seleccionamos.
      fields: { featured, name, price, company, colors, image: img },
    } = product;
    // Una vez tenemos IMG seleccionada dentro de Fields: destructuramos el Array, para conseguir el URL de la img
    const image = img[0].thumbnails.large.url;
    // Nos devuelve todos los items seleccionados unicamente //Image = img[0] destructurada
    return { id, featured, name, price, company, colors, image };
  });
};
// console.log(store); // Vemos la Empty Array Creada ; porque la Function SETUPSTORE se corre en  INDEX.JS
const findProduct = () => {};

// Exportamos agrupadamente.
export { store, setupStore, findProduct };
