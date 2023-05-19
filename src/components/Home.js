import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
import {
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  IconButton,
  Box,
} from '@mui/material';
import { Edit, Check, Close, Done, Delete } from '@mui/icons-material';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';

export function TodoCode({ todo, index, markTodo, removeTodo, removeMarkTodo, editTodo }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedText, setEditedText] = React.useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(index, editedText);
    setIsEditing(false);
  };

  return (
    <Grid container alignItems="center" justifyContent="center" spacing={1}>
  <Grid item xs={12}>
    {isEditing ? (
      <TextField fullWidth value={editedText} onChange={(e) => setEditedText(e.target.value)} />
    ) : (
      <Box sx={{ border: '1px solid black', padding: '8px', marginTop: '8px' }}>
        <Typography variant="body1" style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>
          {todo.text}
        </Typography>
      </Box>
    )}
  </Grid>
  <Grid item xs={12}>
    <Grid container spacing={1}>
      {isEditing ? (
        <>
          <Grid item>
            <IconButton onClick={handleSave}>
              <Check />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={() => setIsEditing(false)}>
              <Close />
            </IconButton>
          </Grid>
        </>
      ) : (
        <>
          <Grid item>
            <IconButton onClick={() => markTodo(index)}>
              <Done />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={() => removeMarkTodo(index)}>
              <RemoveDoneIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={() => removeTodo(index)}>
              <Delete />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={handleEdit}>
              <Edit />
            </IconButton>
          </Grid>
        </>
      )}
    </Grid>
  </Grid>
</Grid>
  );
}
export function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justifyContent="center" spacing={2}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add new todo"
          />
        </Grid>
        <Grid item xs={1} align="right">
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export const Home = () => {
  const snap = useSnapshot(state);

  const [todos, setTodos] = React.useState(snap.listToDo);

  const addTodo = (text) => {
    const newTodo = { text, key: Date.now() };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    state.listToDo = [...snap.listToDo, newTodo]; // Update the valtio state
    console.log(state.listToDo);
  };

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);    
    state.listToDo = newTodos; // Update the valtio state
  };
   const removeMarkTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = false;
    setTodos(newTodos);
    state.listDone = newTodos; // Update the valtio state
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    state.listToDo = newTodos; // Update the valtio state
    state.listDone = [...snap.listDone, todos[index]]; // Update the valtio state
    console.log(state.listDone);
  };

  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], text: newText };
    setTodos(newTodos);
    state.listToDo = newTodos; // Update the valtio state
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Todo List
      </Typography>
      <FormTodo addTodo={addTodo} />
      <div>
        {todos.map((todo, index) => (
          <div key={todo.key}>
            <TodoCode
              index={index}
              todo={todo}
              markTodo={markTodo}
              removeTodo={removeTodo}
              removeMarkTodo={removeMarkTodo}
              editTodo={editTodo}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};