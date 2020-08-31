import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupCompanies = (store) => {
  // Queremos un SET(no repetir items), dentro de un ARRAY(default = Object)
  let companies = ['all', ...new Set(store.map((product) => product.company))]; // "all" --> Damos los mismos valores que el SET a ALL
  //   console.log(companies); // Comprobamos el Array de Companies
  //
  // Queremos Display las Company  en el Companies DIV:
  const companiesDOM = getElement('.companies');
  companiesDOM.innerHTML = companies
    .map((company) => {
      return `<button class="company-btn">${company}</button>`;
    })
    .join('');
  companiesDOM.addEventListener('click', function (e) {
    const element = e.target;
    // console.log(element); // Comprobamos que el CLICK funcione
    if (element.classList.contains('company-btn')) {
      // Si contiene dicha CLass
      let newStore = []; // Array Vacio
      if (element.textContent === 'all') {
        newStore = [...store]; // Mostrar SPREAD(copy and paste) de Store (all)
      } else {
        // Si no es ALL --> newArray = store(cada product mostramos el Company, del texto contenido)
        newStore = store.filter(
          (product) => product.company === element.textContent
        ); // Mostrará solo los que contengan el Texto de lo clickeado
      }
      display(newStore, getElement('.products-container'));
    }
  });
};

export default setupCompanies;
