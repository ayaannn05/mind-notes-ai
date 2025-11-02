const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // Unique ID for the question
  type: { type: String, required: true }, // "multiple_choice" or "true_false"
  question: { type: String, required: true }, // Question text
  options: [{ type: String, required: false }], // Array of options (optional for true/false)
  correct_answer: { type: String }, // Correct answer
  explanation: { type: String }, // Optional explanation
  hint: { type: String }, // Optional hint
});

const quizSchema = new mongoose.Schema({
  noteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true },
  questions: [questionSchema], // Array of questions
});

module.exports = mongoose.model('Quiz', quizSchema);