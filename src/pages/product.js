// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';

// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// Conseguir la ID del product, luego meterla en el Link
let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded', async function () {
  // Url ID for each product: Vemos que navegando desde Products o cualquier lado hacia el Single Product nos devuelve un ID
  const urlID = window.location.search;
  //   console.log(urlID); // Vemos la ID
  //
  // Manejo de Erorres: Hay dos posibles --> Network error and Product Missing Error
  try {
    const response = await fetch(`${singleProductUrl}${urlID}`);
    // Status Entre 200 y 299 es OK, resto ERROR.
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json(); // Pedimos el Json
      //   console.log(product); // Vemos el Object con ID
      // SI TODO OK ----->
      // Destructure, grab data:
      const { id, fields } = product;
      productID = id; // Usamos la Var establecida antes para darle el ID recibido
      const { name, company, price, colors, description } = fields;
      const image = fields.image[0].thumbnails.large.url; // Guardamos la IMG
      //
      // Set Values in DOM:
      document.title = `${name.toUpperCase()} | Comfy`;
      pageTitleDOM.textContent = `Home / ${name}`;
      imgDOM.src = image;
      titleDOM.textContent = name;
      companyDOM.textContent = `By ${company}`;
      priceDOM.textContent = formatPrice(price);
      descDOM.textContent = description;
      // Colors:
      //   console.log(colors); // Vemos que Colors es un Array (debemos iterar)
      colors.forEach((color) => {
        const span = document.createElement('span'); // Creamos Elemento
        span.classList.add('product-color'); // Con una CLase de CSS
        span.style.backgroundColor = `${color}`; // A la cual le cambiaremos el BGColor
        colorsDOM.appendChild(span); // Add this element to Parent
      });
    } else {
      // SI NO: devolver Status y Text (numero + texto del error)
      console.log(response.status, response.statusText);
      // Mostramos el Error:
      centerDOM.innerHTML = `
      <div>
      <h3 class="error"> Something went Wrong </h3>
      <a href = "index.html" class="btn">Back to Home</a>
      </div>`;
    }
  } catch (error) {
    console.log(error);
  }
  //   console.log(response); // Vemos el Producto!! status:200 y probamos con distintos productos

  // Hide the Loading:
  loading.style.display = 'none';
});

// ADD TO CART BTN
cartBtn.addEventListener('click', () => {
  addToCart(productID);
});
