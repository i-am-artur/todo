import axios from 'server/api/todos';
import { api } from 'common/routes';
import { getHeader } from 'services/config';
import { ITodo, ITodoContent } from 'common/todos';

export function fetchInit() {
  return axios.get(`${api.todos}`, getHeader());
}

export function fetchAddTodo(todoContent: ITodoContent) {
  return axios.post(`${api.todos}`, todoContent, getHeader());
}

export function fetchUpdateTodo(todo: ITodo) {
  return axios.put(`${api.todos}`, todo, getHeader());
}

export function fetchRemoveTodo(id: number) {
  return axios.delete(`${api.todos}/${id}`, getHeader());
}
