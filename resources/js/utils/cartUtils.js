const setLoadingValue = (isLoading, idOrValue, value = null) => {
  if (typeof idOrValue === 'boolean') {
    isLoading.value = idOrValue;
  } else if (typeof idOrValue === 'number' && typeof value === 'boolean') {
    isLoading.value = { ...isLoading, [idOrValue]: value };
  }
  return isLoading;
};

const addItemToCart = async (
  cartStore,
  userStore,
  toast,
  data,
  isLoading,
  loadingValue,
) => {
  if (userStore.notifyifNoUserAuthenticated(toast)) return;
  const { product_id, quantity } = data;
  const { id, cart_id } = userStore.checkIfItemIsInCart(product_id) || {};

  const item = {
    user_id: userStore.user.id,
    product_id,
    quantity,
    id,
    cart_id,
  };

  loadingValue
    ? setLoadingValue(isLoading, product_id, true)
    : setLoadingValue(isLoading, true);

  const result = await cartStore.addItemToCart(item);
  if (result.status === 200) {
    const response = await userStore.fetchUserActiveCartItems(
      userStore.user.id,
    );
    if (response.status !== 200) toast.error(response.data.message);
  }

  loadingValue
    ? setLoadingValue(isLoading, product_id, false)
    : setLoadingValue(isLoading, false);
  result.status !== 200
    ? toast.error(result.data.message)
    : toast.success(result.data.message);
};
export { addItemToCart };
