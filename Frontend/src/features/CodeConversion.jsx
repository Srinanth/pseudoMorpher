import React, { useEffect, useState, useCallback } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const languages = ["Pseudocode", "C", "Java", "Assembly", "Python", "JavaScript", "C++", "C#", "Go", "Rust", "Ruby", "Swift", "Kotlin", "PHP", "TypeScript"];

const languageExtensions = {
  "Pseudocode": "txt",
  "C": "c",
  "Java": "java",
  "Assembly": "asm",
  "Python": "py",
  "JavaScript": "js",
  "C++": "cpp",
  "C#": "cs",
  "Go": "go",
  "Rust": "rs",
  "Ruby": "rb",
  "Swift": "swift",
  "Kotlin": "kt",
  "PHP": "php",
  "TypeScript": "ts"
};

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
  const [currentSample, setCurrentSample] = useState("");

  const fetchSampleCode = useCallback(async (language) => {
    const extension = languageExtensions[language];
    if (!extension) return "";
    
    try {
      const response = await fetch(`../public/samplecode/sample.${extension}`);
      if (!response.ok) return "";
      return await response.text();
    } catch (error) {
      console.error(`Error loading sample for ${language}:`, error);
      return "";
    }
  }, []);

  const loadSample = useCallback(async () => {
    if (!inputCode || inputCode === currentSample) {
      const sample = await fetchSampleCode(inputLang);
      if (sample) {
        setInputCode(sample);
        setCurrentSample(sample);
      }
    }
  }, [inputCode, currentSample, inputLang, fetchSampleCode, setInputCode]);

  useEffect(() => {
    loadSample();
  }, [inputLang, loadSample]);

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
            onChange={(e) => {
              setInputCode(e.target.value);
              if (e.target.value !== currentSample) {
                setCurrentSample("");
              }
            }}
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