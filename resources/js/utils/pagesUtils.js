const getPage = (route) => route.query.page || 1;

const getRouteName = (route) => route.name;

const openConfirmModal = (cancelUpdate, showConfirmModal) => {
  cancelUpdate.value = true;
  showConfirmModal.value = true;
};
const navigateToPage = (page, router, route) => {
  router.push({ name: getRouteName(route), query: { page: page } });
};

const fetchItems = async (fetchItemsFunction, route) => {
  await fetchItemsFunction(getPage(route));
};

export { navigateToPage, getPage, getRouteName, openConfirmModal, fetchItems };
