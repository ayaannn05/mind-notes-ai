import { useState } from 'react'
import { Card, Button } from 'antd'
import { CreditCardOutlined } from '@ant-design/icons'

const FlashCard = ({ sessionData }) => {
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const handleNextCard = () => {
        if (sessionData && currentFlashcardIndex < sessionData.flashcards.length - 1) {
            setCurrentFlashcardIndex(prev => prev + 1)
            setIsFlipped(false)
        }
    }

    const handlePrevCard = () => {
        if (currentFlashcardIndex > 0) {
            setCurrentFlashcardIndex(prev => prev - 1)
            setIsFlipped(false)
        }
    }
    const flashcardColors = ['#D32F2F', '#C2185B', '#7B1FA2', '#512DA8', '#303F9F', '#1976D2', '#0288D1', '#0097A7', '#00796B', '#388E3C'];


    return (
        <Card
            title={
                <div className="flex items-center gap-3 py-2">
                    <CreditCardOutlined className="text-xl text-blue-500" />
                    <span className="text-xl font-bold text-gray-800">Flashcards</span>
                </div>
            }
            className="shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl border-none w-full md:w-[30%] text-white "
        >
            <div className="flex flex-col items-center">
                <div
                    className="w-full max-w-2xl h-64 cursor-pointer"
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            transformStyle: 'preserve-3d',
                            transition: 'transform 0.6s',
                            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backfaceVisibility: 'hidden',
                                backgroundColor: flashcardColors[currentFlashcardIndex % flashcardColors.length],
                                borderRadius: '0.75rem',
                                padding: '1rem',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <div className="text-sm text-white mb-1">
                                {sessionData.flashcards[currentFlashcardIndex].front.type}
                            </div>
                            <div className="text-md font-semibold text-center mt-0">
                                {sessionData.flashcards[currentFlashcardIndex].front.content}
                            </div>
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backfaceVisibility: 'hidden',
                                backgroundColor: flashcardColors[currentFlashcardIndex % flashcardColors.length],
                                borderRadius: '0.75rem',
                                padding: '1rem',
                                transform: 'rotateY(180deg)',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <div className="text-sm text-white mb-1">
                                {sessionData.flashcards[currentFlashcardIndex].back.type}
                            </div>
                            <div className="text-md text-center mt-0">
                                {sessionData.flashcards[currentFlashcardIndex].back.content}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 mt-6">
                    <Button
                        onClick={handlePrevCard}
                        disabled={currentFlashcardIndex === 0}
                        className="bg-gray-100 hover:bg-gray-200"
                    >
                        Previous
                    </Button>
                    <span className="text-gray-500">
                        {currentFlashcardIndex + 1} / {sessionData.flashcards.length}
                    </span>
                    <Button
                        onClick={handleNextCard}
                        disabled={currentFlashcardIndex === sessionData.flashcards.length - 1}
                        className="bg-gray-100 hover:bg-gray-200"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default FlashCard