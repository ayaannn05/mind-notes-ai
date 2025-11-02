const mongoose = require('mongoose');

const chatbotMessageSchema = new mongoose.Schema({
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [{
        message: [{
            role: {
                type: String,
                enum: ['user', 'assistant'],
                required: true
            },
            content: { type: String, required: true }
        }],
        timestamp: { type: Date, default: Date.now },
    }],
});

const ChatbotMessage = mongoose.model('ChatbotMessage', chatbotMessageSchema);
module.exports = ChatbotMessage;