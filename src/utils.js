// :::::::::::::: Utils
// Here we have all items necessary

// URLS ---> Una API con nested objects and Array.
// Tenemos el link para ALL PRODUCTS y asu vez el link para INDIVIDUAL PRODUCT
// ALL: Datos
// INDIVIDUAL: Description.
// Queremos extraer data de ALL y luego la descr de INDIVIDUAL para mostrarla en otra page
const allProductsUrl =
  'https://course-api.netlify.app/api/javascript-store-products';
// temporary single product
// 'https://course-api.netlify.app/api/javascript-store-single-product?id=rec43w3ipXvP28vog'
const singleProductUrl =
  'https://course-api.netlify.app/api/javascript-store-single-product';

// Get Element Function --->
const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

const formatPrice = () => {};

const getStorageItem = () => {};
const setStorageItem = () => {};

// Exports
export {
  allProductsUrl,
  singleProductUrl,
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
};
