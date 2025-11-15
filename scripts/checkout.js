import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import formatCurrency from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

const today = dayjs();
const deliveryDate = today.add(7, 'days');
deliveryDate.format('dddd, MMMM D');

function renderOrderSummary() {
  const cartItemHTML = cart.map(generateHTML).join('');

  function generateHTML(cartItem) {
    const { productId, quantity } = cartItem;

    let matchingProduct = products.find((product) => product.id === productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = deliveryOptions.find(
      (option) => option.id === deliveryOptionId
    );

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    return `
    <div class="cart-item-container js-cart-item-container">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
              matchingProduct.id
            }">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)} 
        </div>
      </div>
    </div>
  `;
  }

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    return deliveryOptions
      .map((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString =
          deliveryOption.priceCents === 0
            ? 'FREE'
            : `$${formatCurrency(deliveryOption.priceCents)} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        return `
          <div class="delivery-option" >
            
            <input type="radio"
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
              data-product-id="${matchingProduct.id}"
              data-delivery-option-id="${deliveryOption.id}"
            >
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} - Shipping
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  const orderSummary = document.querySelector('.order-summary');

  orderSummary.innerHTML = cartItemHTML;

  orderSummary.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.js-delete-link');
    if (!deleteBtn) return;

    const productId = deleteBtn.dataset.productId;

    removeFromCart(productId);

    const container = deleteBtn.closest('.js-cart-item-container');
    container.remove();
  });

  orderSummary.addEventListener('change', (e) => {
    if (!e.target.matches('.delivery-option-input')) return;
    const { productId, deliveryOptionId } = e.target.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    renderOrderSummary();
  });
}

renderOrderSummary();