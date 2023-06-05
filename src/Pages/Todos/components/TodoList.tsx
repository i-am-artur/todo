import { feature } from 'styles/variables';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import { useStoreDispatch, useTodos } from 'store/hooks';
import { useState, Fragment, useContext } from 'react';
import { ITodo, ITodoContent } from 'common/todos';
import Todo from 'Pages/Todos/components/Todo';
import { remove, update } from 'store/todos/actions';
import { AppContext } from 'Layouts/App/AppLayout';

export default function TodoList() {
  const app = useContext(AppContext);
  const todos = useTodos();
  const dispatch = useStoreDispatch();
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
  const [error, setError] = useState('');

  const filteredTodos = todos.filter(
    (el) => el.title.includes(app.search) || el.note.includes(app.search),
  );

  function updateTodo(newValue: ITodoContent) {
    if (selectedTodo !== null) {
      dispatch(update({ id: selectedTodo.id, ...newValue })).then(({ type }) => {
        if (type === 'update/rejected') {
          setError('Error! Try again.');
        } else {
          setSelectedTodo(null);
        }
      });
    }
  }

  function removeTodo() {
    if (selectedTodo !== null) {
      dispatch(remove(selectedTodo.id)).then(({ type }) => {
        if (type === 'remove/rejected') {
          setError('Error! Try again.');
        } else {
          setSelectedTodo(null);
        }
      });
    }
  }

  return (
    <Fragment>
      <Stack
        component='ul'
        spacing={feature.gap.v}
        sx={{
          '& .MuiCard-root': {
            border: '1px solid #e5e5e5',
          },
        }}
      >
        {filteredTodos.map((el) => (
          <li key={el.id}>
            <Card
              onClick={() => {
                setError('');
                setSelectedTodo(el);
              }}
              sx={{
                width: '100%',
              }}
            >
              <CardContent>
                <Typography variant='todoListTitle'>{el.title}</Typography>
                <p>{el.note}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </Stack>
      <Todo
        value={selectedTodo}
        onSave={updateTodo}
        onDelete={removeTodo}
        showDelete={true}
        onClose={() => setSelectedTodo(null)}
        error={error}
      />
    </Fragment>
  );
}
