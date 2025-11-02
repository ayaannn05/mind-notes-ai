import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNote } from "../../apis/notes";
import toast from "react-hot-toast";
import { exportSessionInPdf } from "../../utils/exportToPdf";
import { FaDownload, FaArrowLeft, FaComment, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Flashcard from "../../components/Notes/Flashcard";
import Quizes from "../../components/Notes/quizes";
import Summary from "../../components/Notes/summary";
import DetailNotes from "../../components/Notes/DetailNotes";
import Loader from "../../components/common/Loader";
import ChatBot from "../../components/Chatbot";

const NotePage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [activeTab, setActiveTab] = useState("notes");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getNote(id);
        setNote(response.note);
      } catch (error) {
        setError(error || "Failed to fetch note");
        toast.error(error || "Failed to fetch note");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const tabs = [
    {
      id: "summary",
      label: "Summary",
      icon: "📝",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "notes",
      label: "Study Notes",
      icon: "📚",
      color: "from-green-500 to-green-600",
    },
    {
      id: "flashcards",
      label: "Flashcards",
      icon: "🗂️",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "quiz",
      label: "Quiz",
      icon: "✍️",
      color: "from-pink-500 to-pink-600",
    },
  ];

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 px-4">
        <div className="text-center bg-white p-8 sm:p-10 rounded-2xl shadow-2xl max-w-md w-full border border-red-100">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-8 text-base">{error}</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-[#F57C05] to-[#ff9642] rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
          >
            <FaArrowLeft className="w-4 h-4" />
            Return to Dashboard
          </Link>
        </div>
      </div>
    );

  if (!note) return null;

  const session_data = {
    notes: note.notes,
    summary: note.summary,
    flashcards: note.flashcards,
    quiz: note.quizzes,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            {/* Title Section */}
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <Link
                to="/dashboard"
                className="group flex-shrink-0 p-3 rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-[#F57C05] transform hover:-translate-y-1 border border-gray-100"
                aria-label="Back to dashboard"
              >
                <FaArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 break-words">
                  {note.title}
                </h1>
                <p className="text-sm text-gray-500 font-medium">
                  Created on{" "}
                  {new Date(note.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <button
                onClick={() => exportSessionInPdf(session_data, note.title)}
                className="group flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-[#F57C05] text-[#F57C05] rounded-xl hover:bg-[#F57C05] hover:text-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold flex-1 sm:flex-initial"
              >
                <FaDownload className="w-4 h-4 group-hover:animate-bounce" />
                <span>Export PDF</span>
              </button>
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`group flex items-center justify-center gap-2 px-5 py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold flex-1 sm:flex-initial ${
                  isChatOpen
                    ? "bg-gray-600 hover:bg-gray-700 text-white"
                    : "bg-gradient-to-r from-[#F57C05] to-[#ff9642] text-white hover:from-[#ff9642] hover:to-[#F57C05]"
                }`}
              >
                {isChatOpen ? (
                  <>
                    <FaTimes className="w-4 h-4" />
                    <span>Close Chat</span>
                  </>
                ) : (
                  <>
                    <FaComment className="w-4 h-4 group-hover:animate-bounce" />
                    <span>AI Assistant</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Content Area */}
          <div
            className={`transition-all duration-500 ${
              isChatOpen ? "lg:w-[60%]" : "w-full"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              {/* Tabs Navigation */}
              <div className="border-b border-gray-100 bg-gray-50/50">
                <nav className="flex overflow-x-auto scrollbar-hide">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`group flex items-center gap-3 px-6 sm:px-8 py-4 text-sm font-semibold transition-all duration-300 whitespace-nowrap relative ${
                        activeTab === tab.id
                          ? "text-[#F57C05] bg-white"
                          : "text-gray-600 hover:text-[#F57C05] hover:bg-white/50"
                      }`}
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">
                        {tab.icon}
                      </span>
                      <span>{tab.label}</span>
                      {activeTab === tab.id && (
                        <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F57C05] to-[#ff9642] rounded-t-full" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6 sm:p-8 lg:p-10 bg-white">
                <div
                  className={`transition-all duration-300 ${
                    isLoading ? "opacity-0" : "opacity-100 animate-fadeIn"
                  }`}
                >
                  {activeTab === "notes" && <DetailNotes note={note} />}
                  {activeTab === "summary" && <Summary note={note} />}
                  {activeTab === "flashcards" && <Flashcard note={note} />}
                  {activeTab === "quiz" && <Quizes note={note} />}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Bot Sidebar */}
          {isChatOpen && (
            <div className="lg:w-[40%] transition-all duration-500 animate-slideIn">
              <ChatBot isVisible={isChatOpen} setIsVisible={setIsChatOpen} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotePage;
