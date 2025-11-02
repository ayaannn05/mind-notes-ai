const { generateFlashcardsFromText } = require("../prompt/flashcardPrompt");
const { generateNotesFromText } = require("../prompt/notesPrompt");
const { generateQuizPrompt } = require("../prompt/quizPrompt");
const { generateSummaryFromText } = require("../prompt/summaryPrompt");
const { extractJsonFromLlmResponse } = require("../utils/extractjson");
const geminiModel = require("../utils/llm_helper");

exports.generateNotes = async (fullText) => {
  const prompt = generateNotesFromText(fullText);
  try {
    const llmResponse = await geminiModel.generateContent(prompt);
    const generatedNotes = llmResponse.response.text();
    return generatedNotes;
  } catch (error) {
    throw new Error("Failed to generate notes");
  }
};

exports.generateSummary = async (fullText) => {
  const prompt = generateSummaryFromText(fullText);
  try {
    const llmResponse = await geminiModel.generateContent(prompt);
    const generatedSummary = llmResponse.response.text();
    return generatedSummary;
  } catch (error) {
    throw new Error("Failed to generate summary");
  }
};

exports.generateFlashcards = async (fullText) => {
  const prompt = generateFlashcardsFromText(fullText);
  try {
    const llmResponse = await geminiModel.generateContent(prompt);
    const generatedFlashcards = extractJsonFromLlmResponse(
      llmResponse.response.text()
    );
    return generatedFlashcards;
  } catch (error) {
    throw new Error("Failed to generate flashcards");
  }
};

exports.generateQuizzes = async (fullText) => {
  const prompt = generateQuizPrompt(fullText);
  try {
    const llmResponse = await geminiModel.generateContent(prompt);

    const quizzes = extractJsonFromLlmResponse(llmResponse.response.text());
    // console.log(
    //   "Parsed Questions:",
    //   JSON.stringify(quizzes.questions, null, 2)
    // );

    // Ensure the structure is correct
    if (!Array.isArray(quizzes.questions)) {
      throw new Error("Questions must be an array.");
    }
    return quizzes;
  } catch (error) {
    throw new Error("Failed to generate quizzes");
  }
};
