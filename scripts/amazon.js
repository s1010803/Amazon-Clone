import { products } from '../data/products.js';
import { cart } from '../data/cart.js';

const productsHTML = products.map(generateHTML).join('');

function generateHTML(product) {
  return `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
        product.id
      }">
        Add to Cart
      </button>
    </div>
  `;
}

const productsGrid = document.querySelector('.js-products-grid');

productsGrid.innerHTML = productsHTML;

productsGrid.addEventListener('click', (e) => {
  if (e.target.matches('.js-add-to-cart')) {
    const productId = e.target.dataset.productId;

    //NOTE: find the parent container element first
    const productQuantityContainer = e.target.closest('.product-container');
    //NOTE: then take the select element inside the container
    const quantitySelect = productQuantityContainer.querySelector(
      '.product-quantity-container select'
    );
    //NOTE: get the option value from the select element
    const quantity = Number(quantitySelect.value);

    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ id: productId, quantity });
    }

    let cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    document.querySelector('.js-cart-quantity').textContent = cartQuantity;
  }
});
