import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const router = express.Router();

const apiKey = process.env.Gemini;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

router.post("/convert", async (req, res) => {
  const { input, targetLang } = req.body;

  const prompt = `You are a highly accurate code and pseudocode conversion assistant. Your task is to convert the given input code into the specified target format with maximum precision, minimal verbosity, and optimal efficiency.

Conversion Guidelines:
1. Target Format: ${targetLang || "pseudocode"}
   - If the target format is "pseudocode" or not provided, convert the input into concise, logically structured pseudocode using generic syntax.
   - If the target format is a programming language (e.g., C, Java, Assembly), generate syntactically valid and executable code in that language.

2. Output Rules:
   - Output only the converted code or pseudocode.
   - Do not include any explanations, comments, code fences (like triple backticks), or language identifiers.
   - Eliminate unnecessary lines or variables.
   - Use a compact, efficient, and idiomatic style for the target language.
   - Maintain logical and functional accuracy of the original input.

3. Input:
${input}

Now output only the converted ${targetLang || "pseudocode"} code, and nothing else. Do not use any markdown, formatting, comments, or language labels. Just return the raw code in the most efficient form.
`;



  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({ output: text || "No output received." });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Error contacting Gemini API." });
  }
});
router.post("/explain", async (req, res) => {
  const { input } = req.body;

  const prompt = `You are a precise code explanation assistant. Analyze the input code and explain its logic, structure, and purpose in a clear and concise manner. Focus on what the code does, how it works, and any interesting or tricky parts. Avoid unnecessary details.do a line by line explanation of the code.
### Explanation Guidelines:
1. **Clarity**: Provide a clear, step-by-step explanation of the code's logic and functionality.
2. **Conciseness**: Keep the explanation brief and to the point. Avoid verbose descriptions.
3. **Focus**: Highlight key operations, algorithms, and data structures used in the code.
4. **No Comments**: Do not include comments or annotations in the explanation. Write in a narrative style.

Input Code:
${input}

Explanation:
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({ explanation: text || "No explanation received." });
  } catch (error) {
    console.error("Gemini API Explanation Error:", error);
    res.status(500).json({ error: "Error generating explanation." });
  }
});

export default router;
