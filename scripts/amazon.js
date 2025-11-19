import { products, loadProducts } from '../data/products.js';
import { cart, getProductInfo, updateCart } from '../data/cart.js';
import formatCurrency from './utils/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  const productsHTML = products.map(generateHTML).join('');

  function generateHTML(product) {
    return `
    <div class="product-container js-product-container" data-product-id="${
      product.id
    }">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
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

      ${product.extraInfoHTML()}

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

  updateCartDisplay();

  productsGrid.addEventListener('click', (e) => {
    if (!e.target.matches('.js-add-to-cart')) return;

    const { productId, quantity } = getProductInfo(e.target);

    updateCart(productId, quantity);

    updateCartDisplay();
  });

  function getCartQuantity(cart) {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  function updateCartDisplay() {
    const cartQuantity = getCartQuantity(cart);

    document.querySelector('.js-cart-quantity').textContent = cartQuantity;
  }
}
