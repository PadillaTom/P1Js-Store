// Global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

// Filter imports
import setupSearch from '../filters/search.js';
import setupCompanies from '../filters/companies.js';
import setupPrice from '../filters/price.js';

// Specific imports
import { store } from '../store.js';
import display from '../displayProducts.js';
import { getElement } from '../utils.js';

// Display la Store: (Que, Donde)
const loading = getElement('.page-loading');
display(store, getElement('.products-container'));
loading.style.display = 'none';
// Seleccionamos LOADING, DISPLAY la store, Removemos Loading
