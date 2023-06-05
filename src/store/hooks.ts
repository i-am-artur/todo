import { ReduxDispatch, RootState } from './index';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useStoreDispatch = () => useDispatch<ReduxDispatch>();
export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTodos = () => useStoreSelector((state) => state.todos);
