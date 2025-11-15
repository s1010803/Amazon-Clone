export const cart = [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
  },
];

export function getProductInfo(product) {
  const productId = product.dataset.productId;

  //NOTE: find the parent container element first
  const productQuantityContainer = product.closest('.product-container');
  //NOTE: then take the select element inside the container
  const quantitySelect = productQuantityContainer.querySelector(
    '.product-quantity-container select'
  );
  //NOTE: get the option value from the select element
  const quantity = Number(quantitySelect.value);

  return { productId, quantity };
}

export function updateCart(productId, quantity) {
  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }
}
