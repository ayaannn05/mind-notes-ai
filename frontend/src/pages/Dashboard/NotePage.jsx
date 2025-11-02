import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getNote } from "../../apis/notes";
import toast from "react-hot-toast";
import { exportSessionInPdf } from "../../utils/exportToPdf";
import {
  FaDownload,
  FaArrowLeft,
  FaComment,
  FaTimes,
  FaGripVertical,
} from "react-icons/fa";
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
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || "notes");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isChatParams = searchParams.get("chat");
  const [isChatOpen, setIsChatOpen] = useState(isChatParams === "true");
  const [chatWidth, setChatWidth] = useState(600); // Default chat width
  const [isResizing, setIsResizing] = useState(false);

  const containerRef = useRef(null);

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

  useEffect(() => {
    navigate(`/note/${id}?tab=${activeTab}&chat=${isChatOpen} `, {
      replace: true,
    });
  }, [activeTab, id, navigate, isChatOpen]);

  // Resizing logic
  const startResizing = () => {
    setIsResizing(true);
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  const resize = (e) => {
    if (isResizing && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const newWidth = containerWidth - e.clientX;

      // Min width: 300px, Max width: 70% of container
      const minWidth = 300;
      const maxWidth = containerWidth * 0.7;

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setChatWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", stopResizing);
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResizing);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResizing);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  const tabs = [
    { id: "summary", label: "Summary", icon: "📝" },
    { id: "notes", label: "Study Notes", icon: "📚" },
    { id: "flashcards", label: "Flashcards", icon: "🗂️" },
    { id: "quiz", label: "Quiz", icon: "✍️" },
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col">
      {/* Sticky Header with Title, Tabs, and Actions */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-md flex-shrink-0">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 gap-4">
            {/* Left: Back Button + Title */}
            <div className="flex items-center gap-3 min-w-0 flex-shrink">
              <Link
                to="/dashboard"
                className="group flex-shrink-0 p-2.5 rounded-lg bg-gray-100 hover:bg-[#F57C05] transition-all duration-300 text-gray-600 hover:text-white"
                aria-label="Back to dashboard"
              >
                <FaArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  {note.title}
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  {new Date(note.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Center: Tabs */}
            <div className="flex-1 flex justify-center max-w-2xl">
              <nav className="flex gap-1 bg-gray-100 rounded-xl p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-white text-[#F57C05] shadow-md"
                        : "text-gray-600 hover:text-[#F57C05]"
                    }`}
                  >
                    <span className="text-base group-hover:scale-110 transition-transform">
                      {tab.icon}
                    </span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => exportSessionInPdf(session_data, note.title)}
                className="group flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-[#F57C05] text-[#F57C05] rounded-lg hover:bg-[#F57C05] hover:text-white shadow-sm hover:shadow-md transition-all duration-300 font-semibold"
                title="Export PDF"
              >
                <FaDownload className="w-4 h-4 group-hover:animate-bounce" />
                <span className="hidden lg:inline">Export</span>
              </button>
              <button
                onClick={() => {
                  setIsChatOpen(!isChatOpen);
                  navigate(`/note/${id}?chat=${!isChatOpen}`, {
                    replace: true,
                  });
                }}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 font-semibold ${
                  isChatOpen
                    ? "bg-gray-600 hover:bg-gray-700 text-white"
                    : "bg-gradient-to-r from-[#F57C05] to-[#ff9642] text-white hover:from-[#ff9642] hover:to-[#F57C05]"
                }`}
                title={isChatOpen ? "Close Chat" : "Open AI Assistant"}
              >
                {isChatOpen ? (
                  <>
                    <FaTimes className="w-4 h-4" />
                    <span className="hidden lg:inline">Close</span>
                  </>
                ) : (
                  <>
                    <FaComment className="w-4 h-4 group-hover:animate-bounce" />
                    <span className="hidden lg:inline">AI Chat</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Screen Height */}
      <div
        ref={containerRef}
        className="flex max-h-[85vh] flex-1 overflow-hidden"
      >
        {/* Content Area - Resizable */}
        <div
          className="overflow-y-auto flex-1"
          style={{
            width: isChatOpen ? `calc(100% - ${chatWidth}px)` : "100%",
          }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 lg:p-10">
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

        {/* Resizable Divider */}
        {isChatOpen && (
          <>
            <div
              onMouseDown={startResizing}
              className="hidden lg:flex w-1 bg-gray-200 hover:bg-[#F57C05] cursor-ew-resize transition-colors relative group flex-shrink-0"
            >
              {/* Grip Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-300 group-hover:bg-[#F57C05] rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <FaGripVertical className="text-white w-3 h-3" />
              </div>
            </div>

            {/* Chat Bot Sidebar - Resizable */}
            <div
              className="hidden lg:flex flex-col bg-white border-l border-gray-200 flex-shrink-0"
              style={{ width: `${chatWidth}px` }}
            >
              <ChatBot isVisible={isChatOpen} setIsVisible={setIsChatOpen} />
            </div>
          </>
        )}
      </div>

      {/* Mobile Chat Overlay */}
      {isChatOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl animate-slideInRight">
            <ChatBot isVisible={isChatOpen} setIsVisible={setIsChatOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotePage;
