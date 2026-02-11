
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";


dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// async function main() {
// const response = await ai.models.generateContent({
//   model: "gemini-2.5-flash",
//   contents: "Explain how AI works in a few words",
// });
// console.log(response.text);
// }

// main();

// ESモジュール環境で__dirnameの代わりにimport.meta.urlを使う
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const pdfPath = path.join(projectRoot, "img/billing.pdf");
const base64ImageFile = fs.readFileSync(pdfPath, {
  encoding: "base64",
});

const text = `
この請求書から以下情報を抜き出してください。出力フォーマットはJSONです。
- 請求元
- 請求先
- 振り込み日
- 振り込み先
- 振り込み先口座番号
- 請求金額（税抜）
- 消費税
- 請求金額（税込み）
- 明細の商品名、品番、単価、数、金額
`;
const contents = [
  {
    inlineData: {
      mimeType: "application/pdf",
      data: base64ImageFile,
    },
  },
  { text },
];

const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: contents,
});
console.log(response.text);
