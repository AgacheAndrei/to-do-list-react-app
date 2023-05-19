import React from "react";
import { useSnapshot } from "valtio";
import state from '../store';
import { Grid, Typography } from "@mui/material";

const ListToDo = () => {
  const snap = useSnapshot(state);
  const { listToDo } = snap; // Access the listDone array from the valtio state

  return (
    <Grid container spacing={12} justifyContent="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h4" align="center">To-Do</Typography>
        <ul>
          {listToDo.map((item) => (
            <li key={item.key}>{item.text}</li>
          ))}
        </ul>
      </Grid>
    </Grid>
  );
};

export default ListToDo;