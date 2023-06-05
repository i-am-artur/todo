import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAddTodo, fetchInit, fetchRemoveTodo, fetchUpdateTodo } from 'services/todos';
import { ITodo, ITodoContent } from 'common/todos';

// export const remove = createAction<number>('remove');

export const init = createAsyncThunk<
  ITodo[],
  undefined,
  {
    rejectValue: any;
  }
>('init', async (args: undefined, { rejectWithValue }) => {
  return await fetchInit()
    .then((res) => res.data)
    .catch((err) => {
      return rejectWithValue(err);
    });
});

export const add = createAsyncThunk<
  ITodo,
  ITodoContent,
  {
    rejectValue: any;
  }
>('add', async (todoContent: ITodoContent, { rejectWithValue }) => {
  return await fetchAddTodo(todoContent)
    .then((res) => res.data)
    .catch((err) => {
      return rejectWithValue(err);
    });
});

export const update = createAsyncThunk<
  ITodo,
  ITodo,
  {
    rejectValue: any;
  }
>('update', async (todo: ITodo, { rejectWithValue }) => {
  return await fetchUpdateTodo(todo)
    .then((res) => res.data)
    .catch((err) => {
      return rejectWithValue(err);
    });
});

export const remove = createAsyncThunk<
  // Return type of the payload creator
  number,
  // First argument to the payload creator
  number,
  {
    rejectValue: any;
  }
>('remove', async (id: number, { rejectWithValue }) => {
  return await fetchRemoveTodo(id)
    .then(() => id)
    .catch((err) => {
      // console.log(err.response);
      return rejectWithValue(err);
    });
});
