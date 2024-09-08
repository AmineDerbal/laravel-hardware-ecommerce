const getPage = (route) => route.query.page || 1;

const getRouteName = (route) => route.name;

const navigateToPage = (page, router, route) => {
  router.push({ name: getRouteName(route), query: { page: page } });
};

export { navigateToPage, getPage, getRouteName };
