import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNote } from "../../apis/notes";
import toast from "react-hot-toast";
import { exportSessionInPdf } from "../../utils/exportToPdf";
import { FaDownload, FaArrowLeft, FaComment } from "react-icons/fa";
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
    { id: "summary", label: "Summary", icon: "📝" },
    { id: "notes", label: "Study Notes", icon: "📚" },
    { id: "flashcards", label: "Flashcards", icon: "🗂️" },
    { id: "quiz", label: "Quiz", icon: "✍️" },
  ];

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
        <div className="text-center bg-white p-6 sm:p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">
            Error Loading Note
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/dashboard"
            className="inline-block px-4 sm:px-6 py-2 sm:py-3 text-white bg-gradient-to-r from-[#F17905] to-[#d66804] rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4 sm:space-x-6 w-full sm:w-auto">
            <Link
              to="/dashboard"
              className="p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-[#F17905] transform hover:-translate-y-1"
            >
              <FaArrowLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight bg-gradient-to-r from-[#F17905] to-[#d66804] bg-clip-text text-transparent truncate">
              {note.title}
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => exportSessionInPdf(session_data, note.title)}
              className="group flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white border-2 border-[#F17905] text-[#F17905] rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              <FaDownload className="mr-2 group-hover:animate-bounce" />
              Export PDF
            </button>
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`group flex items-center px-4 sm:px-6 py-2 sm:py-3 ${
                isChatOpen
                  ? "bg-gray-200"
                  : "bg-gradient-to-r from-[#F17905] to-[#d66804]"
              } text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto justify-center`}
            >
              <FaComment className="mr-2 group-hover:animate-bounce" />
              {isChatOpen ? "Close Chat" : "Open Chat"}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div
            className={`flex-1 transition-all duration-300 ${
              isChatOpen ? "lg:w-2/3" : "w-full"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl backdrop-blur-lg backdrop-filter">
              <div className="border-b overflow-x-auto">
                <nav className="flex flex-nowrap min-w-full">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 sm:space-x-3 px-4 sm:px-8 py-3 sm:py-5 text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                        activeTab === tab.id
                          ? "text-[#F17905] border-b-2 border-[#F17905] bg-gradient-to-b from-orange-50 to-white"
                          : "text-gray-500 hover:text-[#F17905] hover:bg-orange-50"
                      }`}
                    >
                      <span className="text-base sm:text-xl">{tab.icon}</span>
                      <span className="font-semibold">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-4 sm:p-8 animate-fadeIn">
                <div
                  className={`transition-all duration-300 transform ${
                    isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
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

          {isChatOpen && (
            <ChatBot isVisible={isChatOpen} setIsVisible={setIsChatOpen} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NotePage;
