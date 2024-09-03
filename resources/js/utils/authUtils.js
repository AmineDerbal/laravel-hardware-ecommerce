const checkIsAuthenticated = (user) => {
  return user.isAuthenticated && user.name && user.email ? true : false;
};

const handleLoginSubmit = async (userStore, email, password) => {
  await userStore.loginUser({ email, password });
  return checkIsAuthenticated(userStore.user);
};

export { checkIsAuthenticated, handleLoginSubmit };
