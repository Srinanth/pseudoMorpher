import React from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const languages = ["C", "Java", "Assembly", "Pseudocode"];

export default function CodeConversion({
  inputLang,
  outputLang,
  inputCode,
  outputCode,
  setInputLang,
  setOutputLang,
  setInputCode,
  setOutputCode
}) {
  return (
    <Grid container spacing={4} justifyContent="center">
      <Grid item xs={12} md={5}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <TextField
            select
            fullWidth
            label="Input Language"
            value={inputLang}
            onChange={(e) => setInputLang(e.target.value)}
            margin="normal"
          >
            {languages.map((lang) => (
              <MenuItem key={lang} value={lang}>{lang}</MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            multiline
            rows={15}
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Paste your source code here..."
            margin="normal"
          />
        </Paper>
      </Grid>

      <Grid item xs={12} md={5}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <TextField
            select
            fullWidth
            label="Output Language"
            value={outputLang}
            onChange={(e) => setOutputLang(e.target.value)}
            margin="normal"
          >
            {languages.map((lang) => (
              <MenuItem key={lang} value={lang}>{lang}</MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            multiline
            rows={15}
            value={outputCode}
            readOnly
            placeholder="Converted code will appear here..."
            margin="normal"
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
