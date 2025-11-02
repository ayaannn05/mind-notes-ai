const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true }, // Reference to the note
    cards: [
      {
        id: { type: Number, required: true },
        front: {
          type: { type: String, required: true },
          content: { type: String, required: true },
        },
        back: {
          type: { type: String,  required: true },
          content: { type: String, required: true },
        },
      },
    ],
  });

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

module.exports = Flashcard;