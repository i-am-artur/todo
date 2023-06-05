import { crypt, decrypt } from 'server/common/encrypt';

export function generateJWT(payload: any) {
  return crypt(process.env.REACT_APP_JWT_SECRET_KEY, JSON.stringify(payload));
}

export function decryptJWT(jwt: string) {
  return decrypt(process.env.REACT_APP_JWT_SECRET_KEY, jwt);
}

export function getDecryptedJWT(bearer: string) {
  const jwt = bearer.replace('Bearer ', '');

  return JSON.parse(decryptJWT(jwt));
}
