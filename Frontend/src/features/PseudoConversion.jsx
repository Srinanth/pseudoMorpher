import React from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function PseudoConversion() {
  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        Pseudocode Converter
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            multiline
            rows={8}
            placeholder="Enter code or pseudocode..."
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            multiline
            rows={8}
            placeholder="Converted output..."
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
