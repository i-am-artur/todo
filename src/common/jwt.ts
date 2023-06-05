const userKey = 'ags_todo_user';

export function getJWTFromLocalStorage(): string {
  return localStorage.getItem(userKey) ?? '';
}

export function setJWTInLocalStorage(jwt: string) {
  localStorage.setItem(userKey, jwt);
}

export function removeJWTFromLocalStorage() {
  localStorage.removeItem(userKey);
}
