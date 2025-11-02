const { generateNotes, generateSummary, generateFlashcards, generateQuizzes } = require('../helper/contentGenerate');
const catchAsyncError = require('../middleware/catchAsyncError');
const flashcardModel = require('../model/flashcardModel');
const Note = require('../model/notesModel');
const Quiz = require('../model/quizzesModel');
const { SourceType } = require('../config/sourceTypeConfig');
const AppError = require('../utils/appError');
const fs = require("fs");
const { getTranscript, extractVideoId } = require('../helper/youtube');
const { getPdfText } = require('../helper/pdfParse');
const { getVideoTranscript } = require('../helper/videoParse');

exports.getNotes = catchAsyncError(async (req, res, next) => {
    const user = req.user._id;
    const notes = await Note.find({ userId: user }).populate('flashcards').populate('quizzes');
    res.status(200).json({
        status: 'success',
        totalNotes: notes.length,
        notes: notes
    });
})


exports.createNote = catchAsyncError(async (req, res, next) => {
    console.log(req.body)
    const { title, sourceData , sourceType } = req.body;

    if (!title ||  !sourceType) {
        return next(new AppError('Title, source and source type are required', 400));
    }
    let fullText = "";
    switch (sourceType) {
        case SourceType.TEXT:
            fullText = sourceData;
            break;
        case SourceType.SUBTITLE_FILE:
            const filePath = req.file.path;
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            fullText = fileContent;
            break;
        case SourceType.YOUTUBE:
            const videoId = extractVideoId(sourceData);
            const transcript = await getTranscript(videoId);
            fullText = transcript;
            break;
        case SourceType.PDF:
            if(!req.file.path) {
                return next(new AppError('upload pdf file', 400));
            }
            const pdfText = await getPdfText(req.file.path);
            fullText = pdfText;
            break;
        case SourceType.LOCAL_VIDEO:
            if(!req.file.path) {
                return next(new AppError('upload video/audio file', 400));
            }
            const videoText = await getVideoTranscript(req.file.path);
            fullText = videoText;
            break;
        default:
            return next(new AppError('Invalid source type', 400));
    }

    if (!fullText) {
        return next(new AppError('No transcript found in the source', 400));
    }

    // Generate notes
    const notes = await generateNotes(fullText);
    const summary = await generateSummary(fullText);
    const flashcards = await generateFlashcards(fullText);
    const quizzes = await generateQuizzes(fullText);


    const formatQuestions = (quizzes) => {
        return quizzes.map((quiz) => ({
          id: quiz.id,
          type: quiz.type,
          question: quiz.question,
          options: quiz.options,
          correct_answer: quiz.correct_answer,
          explanation: quiz.explanation,
          hint: quiz.hint,
        }));
      };

    const note = new Note({
        userId: req.user._id,
        title,
        notes,
        summary,
        sourceType,

    });
    const flashcard = await flashcardModel.create({
        noteId: note._id,
        cards: flashcards
    });
    const quiz = await Quiz.create({
        noteId: note._id,
        questions: formatQuestions(quizzes.questions)
    });
    note.flashcards = flashcard._id;
    note.quizzes = quiz._id;
    await note.save();

    res.status(201).json({
        status: 'success',
        message: 'Note created successfully',
    });
});


exports.getNote = catchAsyncError(async (req, res, next) => {
    const note = await Note.findById(req.params.id).populate('flashcards').populate('quizzes');
    if (!note) {
        return next(new AppError('Note not found', 404));
    }
    res.status(200).json({
        status: 'success',
        note: note
    });
});


exports.deleteNote = catchAsyncError(async (req, res, next) => {  
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
        return next(new AppError('Note not found', 404));
    }
    res.status(204).json({
        status: 'success',
        message: 'Note deleted',
    });
});

exports.updateNote = catchAsyncError(async (req, res, next) => {
  const { title } = req.body;
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    { title },
    { new: true, runValidators: true }
  );
  if (!note) {
    return next(new AppError("Note not found", 404));
  }
  res.status(200).json({
    status: "success",
    note: note,
  });
});