class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) ?? [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1',
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2',
      },
    ];
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  getProductInfo(product) {
    const productId = product.dataset.productId;

    //NOTE: find the parent container element first
    const productQuantityContainer = product.closest('.js-product-container');
    //NOTE: then take the select element inside the container
    const quantitySelect = productQuantityContainer.querySelector(
      '.product-quantity-container select'
    );
    //NOTE: get the option value from the select element
    const quantity = Number(quantitySelect.value);

    return { productId, quantity };
  }

  updateCart(productId, quantity) {
    const existingProduct = this.cartItems.find(
      (item) => item.productId === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.cartItems.push({ productId, quantity, deliveryOptionId: '1' });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const index = this.cartItems.findIndex(
      (item) => item.productId === productId
    );

    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }

    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const existingProduct = this.cartItems.find(
      (item) => item.productId === productId
    );

    existingProduct.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
