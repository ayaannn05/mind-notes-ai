const geminiModel = require('../utils/llm_helper');
const catchAsync = require("../middleware/catchAsyncError");
const Notes = require('../model/notesModel');
const ChatbotMessage = require('../model/chatbotModel');
const { promptForChat } = require('../prompt/chatPrompt');
const AppError = require("../utils/appError");

exports.generateChat = catchAsync(async (req, res) => {
    const { user_input, noteId } = req.body;
    const userId = req.user._id;
    if(!user_input){
        return next(new AppError('Please enter your question', 400));
    }
    if(!noteId){
        return next(new AppError('No notes found', 400));
    }
    const chatbotMessage = await ChatbotMessage.findOne({ userId, noteId });    

    let chat;
    if (!chatbotMessage) {
        chat = await ChatbotMessage.create({ userId, noteId });
    } else {
        chat = chatbotMessage;
    }

    const notes = await Notes.findById(noteId).populate('flashcards quizzes');
    const prompt = promptForChat(notes,user_input);
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;

    if (response.text() !== "") {
        chat.messages.push({
            message: [
                {
                    role: "user",
                    content: user_input
                },
                {
                    role: "assistant", 
                    content: response.text()
                }
            ]
        });
        await chat.save();
    }

    res.status(200).json({
        response: response.text()   
    });
});

exports.getAllMessages = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const messages = await ChatbotMessage.find({
      userId,
      noteId: req.params.noteId,
    });
    res.status(200).json({
        messages
    });
});

exports.deleteChat = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const chatbotMessage = await ChatbotMessage.findOne({ userId });
    await ChatbotMessage.deleteOne({ userId });
    res.status(200).json({
        message: 'Chat deleted successfully'
    });
});