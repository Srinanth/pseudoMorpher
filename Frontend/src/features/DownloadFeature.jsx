import React from "react";
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

export default function DownloadFeature({ language, outputCode }) {
  const getExtension = (lang) => {
   switch (lang.toLowerCase()) {
    case "c": return "c";
    case "c++": return "cpp";
    case "c#": return "cs";
    case "java": return "java";
    case "assembly": return "asm";
    case "python": return "py";
    case "javascript": return "js";
    case "typescript": return "ts";
    case "go": return "go";
    case "rust": return "rs";
    case "ruby": return "rb";
    case "swift": return "swift";
    case "kotlin": return "kt";
    case "php": return "php";
    case "pseudocode":
    case "pseudo code":
    default: return "txt";
  }
  };

  const handleDownload = () => {
    const ext = getExtension(language);
    const blob = new Blob([outputCode], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `converted.${ext}`;
    link.click();
  };

  return (
    <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleDownload}>
      Download
    </Button>
  );
}
