const getPage = (route) => route.query.page || 1;

const getRouteName = (route) => route.name;

const openConfirmModal = (cancelUpdate, showConfirmModal) => {
  cancelUpdate.value = true;
  showConfirmModal.value = true;
};
const navigateToPage = (page, router, routeName) => {
  router.push({ name: routeName, query: { page: page } });
};

const fetchItems = async (fetchItemsFunction, page) => {
  await fetchItemsFunction(page);
};

export { navigateToPage, getPage, getRouteName, openConfirmModal, fetchItems };
