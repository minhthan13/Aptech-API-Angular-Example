export const ENVIROMENT = {
  USER_STORAGE: 'USER', // name of user save in localStorage
  API_URL: 'http://localhost:5049/api',
  // API_URL: 'https://localhost:7043/api',
  IMG_URL: 'http://localhost:5049/images',
  END_POINT: {
    AUTH: {
      LOGIN: '/account/login/',
      REFRESH_TOKEN: '/Account/refresh-token',
    },
    EMPLOYEES: {
      Get_All: '/account/getAccounts/',
      Add_New: '/Account/add-new-account',
    },
    ROLE: {
      Get_All: '/Role/getRoles/',
    },
  },
};
