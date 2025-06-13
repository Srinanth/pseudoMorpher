import React, { useState } from "react";
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from '@mui/material/CircularProgress';
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { FaCode, FaLockOpen, FaRobot, FaLanguage } from "react-icons/fa";

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
        body: JSON.stringify({ input: outputCode })
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          PseudoMorpher
        </h1>
        <p className="text-xl text-blue-700 mb-6">
          Your AI-powered code conversion companion
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <FaCode className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">Free AI Converter</h3>
            <p className="text-gray-600">Convert code instantly with our powerful AI, completely free to use</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <FaLockOpen className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">No Sign Up Needed</h3>
            <p className="text-gray-600">Start converting immediately - no accounts or logins required</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <FaRobot className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">Code Explanation</h3>
            <p className="text-gray-600">Get detailed explanations to understand the converted code</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <FaLanguage className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">Wide Language Support</h3>
            <p className="text-gray-600">Supports multiple languages and pseudocode conversion</p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        {mode === "code" && (
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
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button 
            variant="contained" 
            size="large"
            startIcon={<RefreshIcon />} 
            onClick={handleConvert} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 shadow-lg"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Convert Code"}
          </Button>
          <DownloadFeature language={outputLang} outputCode={outputCode} />
        </div>

        {outputCode && (
          <div className="flex justify-center mt-6">
            <Button
              variant="outlined"
              size="large"
              startIcon={showExplanation ? <MdExpandLess /> : <MdExpandMore />}
              onClick={toggleExplanation}
              disabled={explaining}
              className="border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700"
            >
              {explaining ? (
                <CircularProgress size={20} color="inherit" />
              ) : showExplanation ? "Hide Explanation" : "Explain Code"}
            </Button>
          </div>
        )}
      </div>

      {showExplanation && (
        <div className="max-w-6xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
            <FaRobot className="mr-2" /> AI Code Explanation
          </h2>
          <div className="prose prose-blue max-w-none">
            <p className="whitespace-pre-wrap">{explanation}</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-200">
  <div className="flex flex-col md:flex-row justify-between items-center">
    <div className="text-blue-700 mb-4 md:mb-0">
      <p className="font-medium">PseudoMorpher - Free forever, no strings attached</p>
      <p className="text-sm">Convert between programming languages and pseudocode with ease</p>
    </div>
    
        <div className="text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} PseudoMorpher. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="hover:text-blue-600">Terms of Service</a>
              <a href="#" className="hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}