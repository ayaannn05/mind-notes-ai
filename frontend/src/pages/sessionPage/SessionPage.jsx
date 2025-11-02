import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getSessionData } from '../../apis/sessionApi'
import toast from 'react-hot-toast'
import { Button, Card } from 'antd'
import { PlayCircleOutlined, BookOutlined, FileTextOutlined, FilePdfOutlined, MessageOutlined } from '@ant-design/icons'
import QuizPlay from '../../components/QuizPlay'
import FormattedMarkdown from '../../utils/FormattedMarkdown'
import FlashCard from '../../components/FlashCard'
import { Spin } from 'antd'
import { exportSessionInPdf } from '../../utils/exportToPdf'
import Chatbot from '../../components/chatbot'
import TextToSpeech from '../../components/TextToSpeech'

const SessionPage = () => {
    const { session_id } = useParams()
    const { session_name } = useLocation().state
    const [sessionData, setSessionData] = useState(null)
    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isChatbotVisible, setIsChatbotVisible] = useState(false);
    useEffect(() => {
        const getData = async () => {
            try {
                const sessionData = await getSessionData(session_id)
                setSessionData(sessionData)
                setIsLoading(false)
            } catch (error) {
                toast.error(error.message)
            }
        }
        getData()
    }, [session_id])
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>
    }
  
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-2xl shadow-lg backdrop-blur-lg bg-opacity-90">
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
                        {session_name}
                    </h1>
                    <div className="flex gap-4">
                        <Button
                            type="primary"
                            size="large"
                            icon={<PlayCircleOutlined className="text-xl" />}
                            onClick={() => setIsQuizModalOpen(true)}
                            disabled={sessionData.quiz.length === 0}
                            className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 flex items-center gap-3 h-12 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-lg border-0"
                        >
                            Start Quiz
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            icon={<FilePdfOutlined className="text-xl" />}
                            onClick={() => exportSessionInPdf(sessionData, session_name)}
                            className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 flex items-center gap-3 h-12 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-lg border-0"
                        >
                            Export Notes
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            icon={<MessageOutlined className="text-xl" />}
                            onClick={() => setIsChatbotVisible(!isChatbotVisible)}
                            className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 flex items-center gap-3 h-12 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-lg border-0"
                        >
                            Chat with AI
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex gap-6 flex-col md:flex-row">
                        {sessionData && sessionData.flashcards && sessionData.flashcards.length > 0 && (
                            <FlashCard sessionData={sessionData} />
                        )}

                        <Card
                            title={
                                <div className="flex items-center gap-3 py-2">
                                    <FileTextOutlined className="text-xl text-teal-600" />
                                    <span className="text-xl font-bold text-gray-800">Summary</span>
                                </div>
                            }
                            className="shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl border-none w-full md:w-[70%] bg-white backdrop-blur-lg bg-opacity-90"
                        >
                            {sessionData && <FormattedMarkdown>{sessionData.summary}</FormattedMarkdown>}
                        </Card>
                    </div>

                    <Card
                        title={
                            <div className="flex items-center gap-3 py-2">
                                <BookOutlined className="text-xl text-teal-600" />
                                <span className="text-xl font-bold text-gray-800">Detailed Notes</span>
                            </div>
                        }
                        className="shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl border-none bg-white backdrop-blur-lg bg-opacity-90"
                    >
                        {sessionData && (
                            <FormattedMarkdown>{sessionData.notes}</FormattedMarkdown>
                        )}
                    </Card>
                </div>

                <QuizPlay sessionData={sessionData} isQuizModalOpen={isQuizModalOpen} setIsQuizModalOpen={setIsQuizModalOpen} />
                <Chatbot isVisible={isChatbotVisible} setIsVisible={setIsChatbotVisible} sessionId={session_id} />
            </div>
        </div>
    )
}

export default SessionPage