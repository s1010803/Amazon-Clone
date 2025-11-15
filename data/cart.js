export const cart = [];

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