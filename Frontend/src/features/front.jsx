import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItemMui from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import CodeConversion from "./CodeConversion";
import PseudoConversion from "./PseudoConversion";
import DownloadFeature from "./DownloadFeature.jsx";

export default function FrontPageUI() {
  const [inputLang, setInputLang] = useState("C");
  const [outputLang, setOutputLang] = useState("Java");
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mode, setMode] = useState("code");

  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (value) => {
    setAnchorEl(null);
    if (value) setMode(value);
  };

  const handleConvert = () => {
    setOutputCode(`// Converted (${inputLang} → ${outputLang})\n${inputCode}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f3f4f6', p: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom color="primary">
        PseudoMorpher
      </Typography>

      <IconButton onClick={handleMenuClick}>
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => handleMenuClose(null)}>
        <MenuItemMui onClick={() => handleMenuClose("code")}>Code Conversion</MenuItemMui>
        <MenuItemMui onClick={() => handleMenuClose("pseudo")}>Pseudocode Conversion</MenuItemMui>
      </Menu>

      {mode === "code" ? (
        <CodeConversion
          inputLang={inputLang}
          outputLang={outputLang}
          inputCode={inputCode}
          outputCode={outputCode}
          setInputLang={setInputLang}
          setOutputLang={setOutputLang}
          setInputCode={setInputCode}
          setOutputCode={setOutputCode}
          handleConvert={handleConvert}
        />
      ) : (
        <PseudoConversion />
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
        <Button variant="contained" startIcon={<RefreshIcon />} onClick={handleConvert}>
          Convert
        </Button>
        <DownloadFeature language={outputLang} outputCode={outputCode} />
      </Box>
    </Box>
  );
}
