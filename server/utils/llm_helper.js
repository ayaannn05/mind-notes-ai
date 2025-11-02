const { GoogleGenerativeAI } = require("@google/generative-ai");
const gemini_api_key = process.env.GEMENI_AI_API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};
 
const geminiModel = googleAI.getGenerativeModel({
  model: process.env.GEMENI_AI_MODEL,
  geminiConfig,
});
 
module.exports = geminiModel;