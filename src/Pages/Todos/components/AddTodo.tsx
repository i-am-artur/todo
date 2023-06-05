import { Button } from '@mui/material';
import { useStoreDispatch } from 'store/hooks';
import { useState, Fragment } from 'react';
import Todo from 'Pages/Todos/components/Todo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ITodoContent } from 'common/todos';
import { add } from 'store/todos/actions';

export default function AddTodo() {
  const [newTodo, setNewTodo] = useState<ITodoContent | null>(null);
  const [error, setError] = useState('');
  const dispatch = useStoreDispatch();

  function addTodo(newValue: ITodoContent) {
    dispatch(add(newValue)).then(({ type }) => {
      if (type === 'add/rejected') {
        setError('Error! Try again.');
      } else {
        setNewTodo(null);
      }
    });
  }

  return (
    <Fragment>
      <Button
        onClick={() => {
          setError('');
          setNewTodo({ title: '', note: '' });
        }}
        variant='contained'
        color='secondary'
        startIcon={<FontAwesomeIcon icon={faPlus} />}
      >
        Add Task
      </Button>
      <Todo value={newTodo} onSave={addTodo} onClose={() => setNewTodo(null)} error={error} />
    </Fragment>
  );
}
