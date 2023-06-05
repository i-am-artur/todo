import axios from 'server/api/auth';
import { api } from 'common/routes';
import { getHeader } from 'services/config';

export async function fetchRegister(email: string, password: string, passwordDuplicate: string) {
  return axios.post(api.auth.register, { email, password, passwordDuplicate });
}

export async function fetchLogin(email: string, password: string) {
  return axios.post(api.auth.login, { email, password });
}

export async function fetchVerifyJWT() {
  return axios.get(api.auth.verify, getHeader());
}
