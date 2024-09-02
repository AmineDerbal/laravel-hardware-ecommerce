const checkIsAuthenticated = (user) => {
  return user.isAuthenticated && user.name && user.email ? true : false;
};

export { checkIsAuthenticated };
