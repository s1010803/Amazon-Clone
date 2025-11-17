import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, findDeliveryOption } from '../../data/deliveryOptions.js';
import { findProduct } from '../../data/products.js';

// ---- Utility Functions ---- //
const formatDate = (days) => dayjs().add(days, 'days').format('dddd, MMMM D');

// ---- Rendering ---- //
export function renderOrderSummary() {
  const html = cart.map(renderCartItem).join('');
  const orderSummary = document.querySelector('.order-summary');

  orderSummary.innerHTML = html;

  // Delegated Events
  orderSummary.addEventListener('click', handleDelete);
  orderSummary.addEventListener('change', handleDeliveryChange);
}

// ---- Cart Item HTML ---- //
function renderCartItem(cartItem) {
  const product = findProduct(cartItem.productId);
  const deliveryOption = findDeliveryOption(cartItem.deliveryOptionId);

  const deliveryDateString = formatDate(deliveryOption.deliveryDays);

  return `
    <div class="cart-item-container js-cart-item-container">
      <div class="delivery-date">
        Delivery date: ${deliveryDateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${product.image}">

        <div class="cart-item-details">
          <div class="product-name">${product.name}</div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">Update</span>
            <span 
              class="delete-quantity-link link-primary js-delete-link" 
              data-product-id="${product.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:</div>
          ${renderDeliveryOptions(product.id, cartItem.deliveryOptionId)}
        </div>
      </div>
    </div>
  `;
}

// ---- Delivery Options HTML ---- //
function renderDeliveryOptions(productId, selectedOptionId) {
  return deliveryOptions
    .map((option) => {
      const dateString = formatDate(option.deliveryDays);

      const priceString =
        option.priceCents === 0
          ? 'FREE'
          : `$${formatCurrency(option.priceCents)} -`;

      return `
        <div class="delivery-option">
          <input 
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${productId}"
            data-product-id="${productId}"
            data-delivery-option-id="${option.id}"
            ${option.id === selectedOptionId ? 'checked' : ''}
          >
          <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString} - Shipping</div>
          </div>
        </div>
      `;
    })
    .join('');
}

// ---- Event Handlers ---- //
function handleDelete(e) {
  const deleteBtn = e.target.closest('.js-delete-link');
  if (!deleteBtn) return;

  const productId = deleteBtn.dataset.productId;
  removeFromCart(productId);

  deleteBtn.closest('.js-cart-item-container').remove();
}

function handleDeliveryChange(e) {
  if (!e.target.matches('.delivery-option-input')) return;

  const { productId, deliveryOptionId } = e.target.dataset;
  updateDeliveryOption(productId, deliveryOptionId);
  renderOrderSummary(); // re-render UI
}
