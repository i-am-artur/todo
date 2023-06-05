import { configureStore } from '@reduxjs/toolkit';
import { todosReducer } from 'store/todos/reducer';
import thunk from 'redux-thunk';

function store() {
  return configureStore({
    reducer: todosReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  });
}

export default store();

export type RootState = ReturnType<typeof todosReducer>;
export type ReduxStore = ReturnType<typeof store>;
export type ReduxDispatch = ReduxStore['dispatch'];
