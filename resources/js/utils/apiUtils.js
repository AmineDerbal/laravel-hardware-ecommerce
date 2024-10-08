import axios from '@/utils/axiosUtils';

const apiRequest = async (
  url,
  method = 'GET',
  data = null,
  multipart = false,
) => {
  if (multipart)
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  try {
    const response = await axios({
      url,
      method,
      data,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const apiAction = async (apiCall, store, OnSuccess = null, Loading = true) => {
  if (Loading) store.isLoading = true;
  store.hasError = false;
  store.errors = {};
  try {
    const response = await apiCall();
    if (OnSuccess) {
      OnSuccess(response.data);
    }
    return response;
  } catch (error) {
    store.hasError = true;
    if (error.response && error.response.status === 422) {
      store.errors = error.response.data.errors;
    }
    return error.response;
  } finally {
    store.isLoading = false;
  }
};

export { apiRequest, apiAction };
