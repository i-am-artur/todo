import { default as originalAxios } from 'axios';
import MockAdapter, { RouteParams } from 'axios-mock-adapter-path-params';
import { api } from 'common/routes';
import { getDecryptedJWT } from 'server/common/jwt';
import { db } from 'server/db';
import { ITodo } from 'common/todos';

const routeParams: RouteParams = {
  ':todoId': '[0-9]{1,8}',
};

const axios = originalAxios.create();
const mockedAxios = new MockAdapter(axios, {}, routeParams);

mockedAxios.onGet(api.todos).reply(function (config) {
  const user = getDecryptedJWT(config.headers?.Authorization);
  if (user?.id) {
    return [200, db.todos];
  }

  return [400, { ok: false, message: 'Not authorized' }];
});

mockedAxios.onPost(api.todos).reply(function (config) {
  const user = getDecryptedJWT(config.headers?.Authorization);
  if (user?.id) {
    const maxId = db.todos.reduce((pre, cur) => (cur.id > pre ? cur.id : pre), 0) + 1;
    const todoContent = { ...JSON.parse(config.data), id: maxId };

    return [200, todoContent];
  }

  return [400, { ok: false, message: 'Not authorized' }];
});

mockedAxios.onPut(api.todos).reply(function (config) {
  const user = getDecryptedJWT(config.headers?.Authorization);
  if (user?.id) {
    const todo = JSON.parse(config.data) as ITodo;
    const todos = db.todos.map((el) => (el.id === todo.id ? { ...todo } : el));

    return [200, todos];
  }

  return [400, { ok: false, message: 'Not authorized' }];
});

mockedAxios.onDelete(`${api.todos}/:todoId`).reply(function (config) {
  // @ts-ignore
  const { todoId } = config.routeParams;

  const user = getDecryptedJWT(config.headers?.Authorization);
  if (user?.id) {
    db.todos.filter((el) => el.id !== todoId);
    return [200, { ok: true }];
  }

  return [400, { ok: false, message: 'Not authorized' }];
});

export default axios;
