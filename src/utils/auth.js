import Cookies from 'js-cookie';

export const AUTH_TOKEN = 'auth_token';
export const USER_ROLE = 'user_role';
export const USER_ID = 'user_id';

export const setAuthCookies = (token, role,id) => {
  // Set cookies with 7 days expiry
  Cookies.set(AUTH_TOKEN, token, { expires: 7 });
  Cookies.set(USER_ROLE, role, { expires: 7 });
  Cookies.set(USER_ID, id, { expires: 7 });
};

export const getAuthToken = () => {
  return Cookies.get(AUTH_TOKEN);
};

export const getUserRole = () => {
  return Cookies.get(USER_ROLE);
};

export const getUserId = () => {
  return Cookies.get(USER_ID);
};

export const removeAuthCookies = () => {
  Cookies.remove(AUTH_TOKEN);
  Cookies.remove(USER_ROLE);
   Cookies.remove(USER_ID);
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};
