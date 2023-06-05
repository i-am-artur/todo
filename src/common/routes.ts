export const routes = {
  welcome: '/',
  login: '/login',
  register: '/registration',
  todos: '/todos',
};

const apiPath = '/api';
const apiAuth = `${apiPath}/auth`;

export const api = {
  auth: {
    register: `${apiAuth}/register`,
    login: `${apiAuth}/login`,
    verify: `${apiAuth}/verify`,
  },
  todos: `${apiPath}/todos`,
};
