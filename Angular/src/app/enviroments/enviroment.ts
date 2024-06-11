export const ENVIROMENT = {
  USER_STORAGE: 'USER', // name of user save in localStorage
  API_URL: 'http://localhost:5049/api',
  END_POINT: {
    AUTH: {
      LOGIN: '/account/login/',
      REFRESH_TOKEN: '/Account/refresh-token',
    },
    EMPLOYEES: {
      Get_All: '/account/getAccounts/',
    },
    ROLE: {
      Get_All: '/Role/getRoles/',
    },
  },
};
