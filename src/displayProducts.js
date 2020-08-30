import { formatPrice } from './utils.js';
import { addToCart } from './cart/setupCart.js';

// Main Function para mostrar lo solicitado

const display = (products, element) => {
  //   console.log(products, element); // Vemos el array "featured" y el elemento DIV "featured-center"
  // Display: Metemos el elemento, y el cotenido deseado del producto
  element.innerHTML = products
    .map((product) => {
      // Destructuramos el Product, buscando lo que nos sirve:
      const { id, name, image, price } = product;
      return `
    <article class="product">
          <div class="product-container">
            <img
              src="${image}"
              class="product-img img"
              alt="${name}"
            /> 
        
        <div class="product-icons">
              <a href="./product.html?id=${id}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
              <button class="product-cart-btn product-icon" data-id="${id}">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div> 
        
        <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">${formatPrice(price)}</h4>
          </footer>
        </article>
          `;
    })
    .join('');
  element.addEventListener('click', function (e) {
    const parent = e.target.parentElement; // Para tener el BTN y no el ICON
    // console.log(parent); // Comprobamos
    if (parent.classList.contains('product-cart-btn')) {
      // Si el Parent de lo clickeado contiene dicha CLass:
      addToCart(parent.dataset.id); // correr la function ADD TO CART (con la ID del parent)
    }
  });
};

// Exportamos
export default display;
