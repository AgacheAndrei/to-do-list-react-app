import React from "react";
import { useSnapshot } from "valtio";
import state from '../store';
import { Grid, Typography } from "@mui/material";

const Done = () => {
  const snap = useSnapshot(state);
  const { listDone } = snap; // Access the listDone array from the valtio state

  return (
    <Grid container spacing={12} justifyContent="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h4" align="center">Done</Typography>
        <ul>
          {listDone.map((item) => (
            <li key={item.key}>{item.text}</li>
          ))}
        </ul>
      </Grid>
    </Grid>
  );
};

export default Done;