import { Card, Modal, Button, Radio, Progress, Tooltip } from 'antd'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const QuizPlay = ({ sessionData, isQuizModalOpen, setIsQuizModalOpen }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [score, setScore] = useState(0)
    const [showResults, setShowResults] = useState(false)
    const [answers, setAnswers] = useState([])
    const [showExplanation, setShowExplanation] = useState(false)
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null)

    useEffect(() => {
        setCurrentQuestion(0)
        setScore(0)
        setShowResults(false)
        setAnswers([])
        setShowExplanation(false)
        setIsAnswerCorrect(null)
    }, [isQuizModalOpen])

    const handleAnswerSubmit = () => {
        const currentQuiz = sessionData.quiz.questions[currentQuestion]
        const isCorrect = selectedAnswer === currentQuiz.correct_answer

        if (!isCorrect && navigator.vibrate) {
            navigator.vibrate(200)
        }

        setIsAnswerCorrect(isCorrect)
        setShowExplanation(true)

        setAnswers([...answers, {
            question: currentQuiz.question,
            userAnswer: selectedAnswer,
            correct: isCorrect,
            explanation: currentQuiz.explanation,
            hint: currentQuiz.hint
        }])

        if (isCorrect) {
            setScore(score + 1)
        }
    }

    const handleNextQuestion = () => {
        if (currentQuestion + 1 < sessionData.quiz.questions.length) {
            setCurrentQuestion(currentQuestion + 1)
            setSelectedAnswer('')
            setShowExplanation(false)
            setIsAnswerCorrect(null)
        } else {
            setShowResults(true)
        }
    }

    const handleCloseQuiz = () => {
        if (currentQuestion < 9) {
            toast.warning('You must answer at least 10 questions to see the results.')
        } else {
            setIsQuizModalOpen(false)
        }
    }
    if (sessionData.quiz.length === 0) {
        return <div>No quiz questions found</div>
    }
    return (
        <Modal
            title={showResults ? "Quiz Results" : "Quiz"}
            open={isQuizModalOpen}
            onCancel={() => setIsQuizModalOpen(false)}
            footer={null}
            width={600} // Reduced width for compactness
            className="rounded-2xl"
        >
            {sessionData && !showResults && (
                <div className="p-4"> {/* Reduced padding for compactness */}
                    <Progress
                        percent={((currentQuestion + 1) / sessionData.quiz.questions.length) * 100}
                        className="mb-4" // Reduced margin for compactness
                        strokeColor="#3B82F6"
                        strokeWidth={6} // Reduced stroke width for compactness
                    />
                    <div className="flex items-center gap-2 mb-2">
                        <Tooltip title={sessionData.quiz.questions[currentQuestion].hint}>
                            <span className="text-blue-500 cursor-help">💡</span>
                        </Tooltip>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800"> {/* Reduced text size for compactness */}
                        {sessionData.quiz.questions[currentQuestion].question}
                    </h3>
                    <Radio.Group
                        onChange={(e) => !showExplanation && setSelectedAnswer(e.target.value)}
                        value={selectedAnswer}
                        className="flex flex-col gap-2" // Reduced gap for compactness
                        disabled={showExplanation}
                    >
                        {sessionData.quiz.questions[currentQuestion].options.map((option, index) => (
                            <Radio
                                key={index}
                                value={option}
                                className={`text-lg p-2 rounded-xl transition-all duration-300 ${showExplanation
                                    ? option === sessionData.quiz.questions[currentQuestion].correct_answer
                                        ? 'bg-green-100 border-2 border-green-500'
                                        : option === selectedAnswer && option !== sessionData.quiz.questions[currentQuestion].correct_answer
                                            ? 'bg-red-100 border-2 border-red-500 animate-shake'
                                            : 'opacity-50'
                                    : 'hover:bg-blue-50 border-2 border-gray-200'
                                    }`}
                            >
                                {option}
                            </Radio>
                        ))}
                    </Radio.Group>

                    {showExplanation && (
                        <div className="mt-4 space-y-2"> {/* Reduced margin and spacing for compactness */}
                            <div className={`p-2 rounded-xl ${isAnswerCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
                                <p className={`font-bold ${isAnswerCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                    {isAnswerCorrect ? '✨ Correct!' : '❌ Incorrect'}
                                </p>
                                <p className="text-gray-700 mt-1">{sessionData.quiz.questions[currentQuestion].explanation}</p>
                            </div>
                            <Button
                                type="primary"
                                onClick={handleNextQuestion}
                                className="mt-2 bg-blue-500 w-full hover:bg-blue-600 transition-colors"
                                size="large"
                            >
                                {currentQuestion + 1 === sessionData.quiz.questions.length ? 'Show Results' : 'Next Question'}
                            </Button>
                        </div>
                    )}

                    {!showExplanation && (
                        <Button
                            type="primary"
                            onClick={handleAnswerSubmit}
                            disabled={!selectedAnswer}
                            className="mt-4 bg-blue-500 w-full hover:bg-blue-600 transition-colors"
                            size="large"
                        >
                            Submit Answer
                        </Button>
                    )}
                </div>
            )}

            {showResults && (
                <div className="p-4"> {/* Reduced padding for compactness */}
                    <h3 className="text-2xl font-bold mb-4 text-center text-gray-800"> {/* Reduced text size for compactness */}
                        Your Score: {score}/{sessionData.quiz.questions.length}
                    </h3>
                    <div className="space-y-4">
                        {answers.map((answer, index) => (
                            <Card
                                key={index}
                                className={`${answer.correct ? 'border-green-500' : 'border-red-500'} border-2 shadow-lg hover:shadow-xl transition-all rounded-xl`}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Tooltip title={answer.hint}>
                                        <span className="text-blue-500 cursor-help">💡</span>
                                    </Tooltip>
                                </div>
                                <p className="font-bold text-lg mb-2">{answer.question}</p> {/* Reduced text size for compactness */}
                                <p className="mb-2">Your answer: <span className={`font-semibold ${answer.correct ? 'text-green-600' : 'text-red-600'}`}>{answer.userAnswer}</span></p>
                                <p className="text-gray-700 bg-gray-50 p-2 rounded-xl">{answer.explanation}</p> {/* Reduced padding for compactness */}
                            </Card>
                        ))}
                    </div>
                    <Button
                        onClick={handleCloseQuiz}
                        className="mt-4 w-full hover:bg-gray-100 transition-colors"
                        size="large"
                    >
                        Close Quiz
                    </Button>
                </div>
            )}
        </Modal>
    )
}

export default QuizPlay