import { getJWTFromLocalStorage } from 'common/jwt';

export function getHeader() {
  return {
    headers: { Authorization: `Bearer ${getJWTFromLocalStorage()}` },
  };
}
