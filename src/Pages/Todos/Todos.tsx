import { container, padding } from 'styles/variables';
import { Stack, Typography } from '@mui/material';
import TodoList from 'Pages/Todos/components/TodoList';
import AddTodo from 'Pages/Todos/components/AddTodo';
import { useEffect, useState } from 'react';
import * as todosActions from 'store/todos/actions';
import { useStoreDispatch } from 'store/hooks';
import AlertError from 'components/Alerts/Error';

export default function Todos() {
  const dispatch = useStoreDispatch();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(todosActions.init()).then(({ type }) => {
      if (type === 'init/rejected') {
        setShowError(true);
      } else {
        setShowError(false);
      }
    });
  }, []);

  return (
    <Stack component='main' p={padding.screen} spacing={container.gap.v}>
      <Typography variant='pageHeading'>Todos</Typography>

      <AddTodo />
      <TodoList />
      <AlertError
        message='Error! Try again.'
        show={showError}
        onClose={() => setShowError(false)}
      />
    </Stack>
  );
}
