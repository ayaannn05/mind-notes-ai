const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    sourceType: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    summary: {
        type: String,
    },
    flashcards: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Flashcard"
        }
    ],
    quizzes: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Quiz"
        }
    ],
    chatbot: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chatbot"
    },
    createdAt: {
        type:Date,
        default:Date.now
    },
    updatedAt: {
        type:Date,
        default:Date.now
    }
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;