import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaLightbulb, FaCheck, FaTimes, FaTrophy, FaRegClock } from 'react-icons/fa';

const Quizes = ({ note }) => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);

  const questions = note.quizzes[0]?.questions || [];

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    setShowExplanation(true);
    const isCorrect = option === questions[currentQuestion].correct_answer;
    setAnswers([...answers, {
      question: questions[currentQuestion].question,
      selected: option,
      correct: questions[currentQuestion].correct_answer,
      isCorrect,
      explanation: questions[currentQuestion].explanation
    }]);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowHint(false);
    } else {
      setCompleted(true);
    }
  };

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] sm:h-[400px] bg-gradient-to-br from-orange-50 to-white rounded-xl shadow p-4 sm:p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 sm:mb-6"
        >
          <h1 className="text-xl sm:text-2xl font-bold text-[#E06901] mb-2">Ready to Challenge Yourself?</h1>
          <p className="text-sm sm:text-base text-gray-600">Test your knowledge!</p>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-[#E06901] to-[#FF8A2B] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow flex items-center space-x-2 text-base sm:text-lg font-medium"
          onClick={handleStart}
        >
          <FaPlay className="text-lg sm:text-xl" />
          <span>Begin Quiz</span>
        </motion.button>
      </div>
    );
  }

  if (completed) {
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const percentage = (correctAnswers / answers.length) * 100;
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4 p-4 sm:p-6 bg-white rounded-xl shadow"
      >
        <div className="text-center mb-4 sm:mb-6">
          <FaTrophy className="text-3xl sm:text-4xl text-yellow-500 mx-auto mb-2" />
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#E06901] to-[#FF8A2B] text-transparent bg-clip-text mb-2">
            Quiz Completed!
          </h2>
          <div className="text-lg sm:text-xl font-medium text-gray-700">
            Score: {correctAnswers}/{answers.length} ({percentage.toFixed(1)}%)
          </div>
        </div>

        <div className="space-y-4 max-h-[300px] sm:max-h-[400px] overflow-y-auto">
          {answers.map((answer, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={index}
              className="bg-gradient-to-br from-white to-orange-50 p-3 sm:p-4 rounded-lg shadow"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                {answer.isCorrect ? 
                  <FaCheck className="text-green-600 text-sm sm:text-base" /> : 
                  <FaTimes className="text-red-600 text-sm sm:text-base" />
                }
                <h3 className="text-sm sm:text-base font-medium text-gray-800">{answer.question}</h3>
              </div>
              
              <div className="ml-4 sm:ml-6 space-y-2 text-xs sm:text-sm">
                <div>
                  <span className="font-medium text-gray-700">Your answer: </span>
                  <span className={answer.isCorrect ? "text-green-600" : "text-red-600"}>
                    {answer.selected}
                  </span>
                </div>
                
                {!answer.isCorrect && (
                  <div className="text-green-600">
                    <span className="font-medium">Correct: </span>{answer.correct}
                  </div>
                )}
                
                <div className="bg-white/50 p-2 sm:p-3 rounded-lg">
                  <p className="text-gray-600">{answer.explanation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto p-3 sm:p-4"
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-4">
        <div className="flex items-center gap-2 bg-orange-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
          <FaRegClock className="text-[#E06901]" />
          <span className="font-medium text-[#E06901]">
            {currentQuestion + 1}/{questions.length}
          </span>
        </div>
        <div className="h-1.5 sm:h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#E06901] transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          {questions[currentQuestion].question}
        </h3>
        
        <div className="space-y-2 sm:space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.01 }}
              onClick={() => !selectedAnswer && handleAnswer(option)}
              className={`w-full p-3 sm:p-4 rounded-lg text-left text-sm sm:text-base ${
                selectedAnswer === option
                  ? option === questions[currentQuestion].correct_answer
                    ? "bg-green-100 border border-green-500"
                    : "bg-red-100 border border-red-500"
                  : "bg-gray-50 hover:bg-gradient-to-r from-[#E06901] to-[#FF8A2B] hover:text-white"
              }`}
              disabled={selectedAnswer !== null}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/80 flex items-center justify-center text-xs sm:text-sm font-medium text-gray-700">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {!showExplanation && (
          <button
            onClick={() => setShowHint(true)}
            className="mt-4 flex items-center gap-2 text-[#E06901] hover:text-[#b35401] text-xs sm:text-sm font-medium"
          >
            <FaLightbulb /> Need a Hint?
          </button>
        )}

        {showHint && !showExplanation && (
          <div className="mt-4 p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-[#E06901] text-xs sm:text-sm">{questions[currentQuestion].hint}</p>
          </div>
        )}

        {showExplanation && (
          <div className="mt-4">
            <div className="p-3 sm:p-4 bg-gray-50 rounded-lg mb-4">
              <p className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Explanation:</p>
              <p className="text-gray-700 text-xs sm:text-sm">{questions[currentQuestion].explanation}</p>
            </div>
            <button
              onClick={nextQuestion}
              className="w-full bg-gradient-to-r from-[#E06901] to-[#FF8A2B] text-white py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base"
            >
              {currentQuestion === questions.length - 1 ? "Show Results" : "Next Question"}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Quizes;
