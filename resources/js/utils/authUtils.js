const checkIsAuthenticated = (user) => {
  return user.isAuthenticated && user.name && user.email ? true : false;
};

const notifyIfNotAuthenticated = (user, toast) => {
  if (!checkIsAuthenticated(user)) {
    toast.error('Please login to add product to cart');
    return true;
  }

  return false;
};

const handleLoginSubmit = async (userStore, userData) => {
  await userStore.loginUser(userData);
  return checkIsAuthenticated(userStore.user);
};

const handleRegisterSubmit = async (userStore, userData) => {
  return await userStore.registerUser(userData);
};

const redirectIfAuthenticated = (user, to, from, next) => {
  if (checkIsAuthenticated(user)) {
    next({ name: 'home' });
  } else {
    next();
  }
};

const logoutUser = async (userStore) => {
  await userStore.logoutUser();
  return !checkIsAuthenticated(userStore.user);
};

export {
  checkIsAuthenticated,
  handleLoginSubmit,
  redirectIfAuthenticated,
  handleRegisterSubmit,
  logoutUser,
  notifyIfNotAuthenticated,
};
