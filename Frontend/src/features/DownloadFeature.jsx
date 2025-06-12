import React from "react";
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

export default function DownloadFeature({ language, outputCode }) {
  const getExtension = (lang) => {
    switch (lang.toLowerCase()) {
      case "c": return "c";
      case "java": return "java";
      case "assembly": return "asm";
      case "pseudocode": return "txt";
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
