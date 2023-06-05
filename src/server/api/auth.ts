import { default as originalAxios } from 'axios';
import MockAdapter from 'axios-mock-adapter-path-params';
import { api } from 'common/routes';
import { validateLogin, validateRegister } from 'lib/zod/authServer';
import { db } from 'server/db';
import { IUser, IUserPassword } from 'common/user';
import { crypt } from 'server/common/encrypt';
import { getUserByEmail } from 'server/common/user';
import { decryptJWT, generateJWT } from 'server/common/jwt';

const axios = originalAxios.create();
const mockedAxios = new MockAdapter(axios, { delayResponse: 1000 });

mockedAxios.onPost(api.auth.register).reply(function (config) {
  const { email, password, passwordDuplicate } = JSON.parse(config.data);

  const validation = validateRegister(email, password, passwordDuplicate);
  if (!validation.success) {
    const errors = validation.error.format();
    return [
      400,
      {
        ok: false,
        inputValidation: false,
        email: errors?.email?._errors[0],
        password: errors?.password?._errors[0],
        passwordDuplicate: errors?.passwordDuplicate?._errors[0],
      },
    ];
  }

  const nextUserId = db.users.reduce((pre, cur) => (cur.id > pre ? cur.id : pre), 0) + 1;
  const newUserEntry: IUser = { id: nextUserId, email };

  const nextPasswordId = db.passwords.reduce((pre, cur) => (cur.id > pre ? cur.id : pre), 0) + 1;
  const newPasswordEntry: IUserPassword = {
    id: nextPasswordId,
    userId: nextUserId,
    value: crypt(process.env.REACT_APP_SALT_KEY, password),
  };

  db.users.push({ id: nextUserId, email });
  db.passwords.push(newPasswordEntry);

  return [200, newUserEntry];
});

mockedAxios.onPost(api.auth.login).reply(function (config) {
  const { email, password } = JSON.parse(config.data);

  const validation = validateLogin(email, password);
  if (!validation.success) {
    const errors = validation.error.format();
    return [
      400,
      {
        ok: false,
        inputValidation: false,
        email: errors?.email?._errors[0],
        password: errors?.password?._errors[0],
      },
    ];
  }
  const user = getUserByEmail(email);
  return [200, { jwt: generateJWT(user) }];
});

mockedAxios.onGet(api.auth.verify).reply(function (config) {
  const jwt = `${config.headers?.Authorization}`.replace('Bearer ', '');
  const user = JSON.parse(decryptJWT(jwt));

  const verified = user?.id !== undefined && user?.id !== null;
  return [200, { verified }];
});

export default axios;
