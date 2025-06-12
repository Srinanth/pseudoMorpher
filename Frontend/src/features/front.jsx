import React, { useState } from "react";
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { MdExpandMore, MdExpandLess } from "react-icons/md";

import CodeConversion from "./CodeConversion";
import DownloadFeature from "./DownloadFeature.jsx";

export default function FrontPageUI() {
  const [inputLang, setInputLang] = useState("C");
  const [outputLang, setOutputLang] = useState("Pseudocode");
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [mode, setMode] = useState("code");
  const [loading, setLoading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [explaining, setExplaining] = useState(false);


  const handleConvert = async () => {
  setLoading(true);
  try {
    const response = await fetch("http://localhost:3000/api/gemini/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input: inputCode,
        targetLang: mode === "pseudo" ? null : outputLang
      })
    });
    const data = await response.json();
    setOutputCode(data.output);
  } catch (error) {
    console.error("Conversion error:", error);
    setOutputCode(`Error during conversion: ${error.message}`);
  } finally {
    setLoading(false);
  }
};
const handleExplain = async () => {
    setExplaining(true);
    try {
      const response = await fetch("http://localhost:3000/api/gemini/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: inputCode })
      });
      const data = await response.json();
      setExplanation(data.explanation);
    } catch (error) {
      console.error("Explanation error:", error);
      setExplanation(`Error generating explanation: ${error.message}`);
    } finally {
      setExplaining(false);
    }
  };

  const toggleExplanation = () => {
    if (!showExplanation && !explanation) handleExplain();
    setShowExplanation(!showExplanation);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f3f4f6', p: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom color="primary">
        PseudoMorpher
      </Typography>

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
        />
      ) : (
        NULL
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
        <Button variant="contained" startIcon={<RefreshIcon />} onClick={handleConvert} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Convert"}
        </Button>
        <DownloadFeature language={outputLang} outputCode={outputCode} />
      </Box>
       <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={showExplanation ? <MdExpandLess /> : <MdExpandMore />}
          onClick={toggleExplanation}
          disabled={explaining}
        >
          {explaining ? (
            <CircularProgress size={20} color="inherit" />
          ) : showExplanation ? "Hide Explanation" : "Show Explanation"}
        </Button>
      </Box>

      {showExplanation && (
        <Box
          sx={{
            mt: 3,
            p: 3,
            bgcolor: "#fff",
            borderRadius: 2,
            boxShadow: 2,
            textAlign: "left",
            maxWidth: "900px",
            mx: "auto"
          }}
        >
          <Typography variant="h6" color="primary" gutterBottom>
            Code Explanation
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {explanation}
          </Typography>
        </Box>
      )}
    </Box>
  
  );
}
