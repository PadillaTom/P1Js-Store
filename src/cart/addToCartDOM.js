import { formatPrice, getElement, getStorageItem } from '../utils.js';

const cartItemsDOM = getElement('.cart-items');
// Todo viene de PRODUCT
const addToCartDOM = ({ id, name, price, image, amount }) => {
  const article = document.createElement('article');
  article.classList.add('cart-item');
  article.setAttribute('data-id', id);
  article.innerHTML = `
             <img
              src="${image}"
              class ="cart-item-img"
              alt="${name}"
            />
                      <div>
              <h4 class="cart-item-name">${name}</h4>
              <p class="cart-item-price">${formatPrice(price)}</p>
              <button class="cart-item-remove-btn" data-id="${id}">remove</button>
            </div>
                      <div>
              <button class="cart-item-increase-btn">
                <i class="fas fa-chevron-up"></i>
              </button>
              <p class="cart-item-amount">${amount}</p>
              <button class="cart-item-decrease-btn">
                <i class="fas fa-chevron-down"></i>
              </button>
            </div>
        `;
  cartItemsDOM.appendChild(article);
};

export default addToCartDOM;
