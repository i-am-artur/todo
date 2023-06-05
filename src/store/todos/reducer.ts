import { createReducer } from '@reduxjs/toolkit';
import { add, init, remove, update } from 'store/todos/actions';
import { ITodo } from 'common/todos';

export const initialState = {
  todos: <ITodo[]>[],
};

export const todosReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(init.fulfilled, (state, action) => {
      state.todos = action.payload;
    })
    .addCase(add.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    })
    .addCase(remove.fulfilled, (state, action) => {
      state.todos = state.todos.filter((el) => el.id !== action.payload);
    })
    .addCase(update.fulfilled, (state, action) => {
      state.todos = state.todos.map((el) =>
        el.id === action.payload.id ? { ...action.payload } : el,
      );
    });
});
