import React, { useState } from 'react'
import { createNote } from '../apis/notes'
import toast from 'react-hot-toast'
import {
  FaTimes,
  FaYoutube,
  FaFileAlt,
  FaFileUpload,
  FaFileVideo,
  FaFileWord,
  FaArrowLeft,
} from "react-icons/fa";
import { Card } from "antd";

const SourceType = {
  YOUTUBE: "youtube",
  SUBTITLE_FILE: "subtitle_file",
  TEXT: "text",
  PDF: "pdf",
  LOCAL_VIDEO: "local_video",
};

const CreateNoteModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [sourceType, setSourceType] = useState(null);
  const [sourceData, setSourceData] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setShowAnimation(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("sourceType", sourceType);

      if (sourceType === SourceType.TEXT || sourceType === SourceType.YOUTUBE) {
        formData.append("sourceData", sourceData);
      } else {
        formData.append("file", file);
      }

      // Animate progress bar
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      await createNote(formData);
      setProgress(100);
      toast.success("Note created successfully");

      // Add small delay to show 100% completion
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 500);
    } catch (error) {
      setShowAnimation(false);
      setProgress(0);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sourceTypes = [
    {
      type: SourceType.YOUTUBE,
      icon: <FaYoutube className="text-3xl" />,
      title: "YouTube",
      description: "Video URL",
      gradient: "from-red-500 to-red-600",
    },
    {
      type: SourceType.TEXT,
      icon: <FaFileWord className="text-3xl" />,
      title: "Text",
      description: "Content/Prompt",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      type: SourceType.PDF,
      icon: <FaFileAlt className="text-3xl" />,
      title: "PDF",
      description: "Document",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      type: SourceType.LOCAL_VIDEO,
      icon: <FaFileVideo className="text-3xl" />,
      title: "Video/Audio",
      description: "Media file",
      gradient: "from-green-500 to-green-600",
    },
    {
      type: SourceType.SUBTITLE_FILE,
      icon: <FaFileUpload className="text-3xl" />,
      title: "Subtitle",
      description: "SRT/VTT file",
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  const getStatusMessage = () => {
    if (progress < 30) return "Analyzing content...";
    if (progress < 60) return "Extracting information...";
    if (progress < 90) return "Generating notes...";
    return "Finalizing...";
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-xl shadow-2xl transform transition-all animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F57C05] to-[#ff9642] flex items-center justify-center shadow-md">
              <span className="text-white text-xl">📝</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Create New Note
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Compact Loading Animation */}
          {showAnimation && (
            <div className="mb-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-6 border border-orange-200">
              <div className="flex items-center gap-4">
                {/* Compact Spinner */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 border-3 border-[#F57C05] rounded-full animate-spin border-t-transparent"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-lg">🧠</span>
                  </div>
                </div>

                {/* Progress Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-800">
                      {getStatusMessage()}
                    </p>
                    <span className="text-sm font-bold text-[#F57C05]">
                      {progress}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative w-full h-2 bg-white/50 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#F57C05] to-[#ff9642] transition-all duration-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Source Type Selection */}
          {step === 1 ? (
            <div>
              <p className="text-gray-600 mb-6 text-base">
                Choose how you'd like to create your notes:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {sourceTypes.map((source) => (
                  <button
                    key={source.type}
                    onClick={() => {
                      setSourceType(source.type);
                      setStep(2);
                    }}
                    className="group relative p-5 rounded-xl border-2 border-gray-200 hover:border-[#F57C05] bg-white hover:bg-orange-50/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${source.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                      >
                        {source.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {source.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {source.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Step 2: Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Selected Source Indicator */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl border border-orange-200">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                    sourceTypes.find((s) => s.type === sourceType)?.gradient
                  } flex items-center justify-center text-white shadow-sm`}
                >
                  {sourceTypes.find((s) => s.type === sourceType)?.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">
                    Creating from
                  </p>
                  <p className="font-semibold text-gray-900">
                    {sourceTypes.find((s) => s.type === sourceType)?.title}
                  </p>
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Note Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F57C05] focus:border-transparent bg-white text-gray-900 placeholder-gray-400 transition-all"
                  placeholder="e.g., History Chapter 1 - World War II"
                  required
                />
              </div>

              {/* Content/File Input */}
              {sourceType === SourceType.TEXT ||
              sourceType === SourceType.YOUTUBE ? (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {sourceType === SourceType.TEXT
                      ? "Content or Prompt"
                      : "YouTube URL"}
                  </label>
                  <textarea
                    value={sourceData}
                    onChange={(e) => setSourceData(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F57C05] focus:border-transparent bg-white text-gray-900 placeholder-gray-400 resize-none transition-all"
                    rows={sourceType === SourceType.TEXT ? 5 : 2}
                    placeholder={
                      sourceType === SourceType.TEXT
                        ? "Paste your content or enter a prompt...\n\nExample: Explain the causes and effects of the American Revolution"
                        : "https://www.youtube.com/watch?v=..."
                    }
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload File
                  </label>
                  <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 hover:border-[#F57C05] transition-all cursor-pointer">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept={
                        sourceType === SourceType.PDF
                          ? ".pdf"
                          : sourceType === SourceType.LOCAL_VIDEO
                          ? "video/*,audio/*"
                          : ".srt,.vtt"
                      }
                      required
                    />
                    <div className="text-center pointer-events-none">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-100 flex items-center justify-center">
                        <FaFileUpload className="text-[#F57C05] text-xl" />
                      </div>
                      {file ? (
                        <p className="text-sm font-medium text-gray-900">
                          {file.name}
                        </p>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            {sourceType === SourceType.PDF && "PDF files only"}
                            {sourceType === SourceType.LOCAL_VIDEO &&
                              "Video or audio files"}
                            {sourceType === SourceType.SUBTITLE_FILE &&
                              "SRT or VTT files"}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setSourceType(null);
                    setFile(null);
                  }}
                  className="flex items-center justify-center gap-2 px-5 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all hover:border-gray-400"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-[#F57C05] to-[#ff9642] text-white py-3 px-6 rounded-xl hover:from-[#ff9642] hover:to-[#F57C05] transition-all disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed font-semibold shadow-lg shadow-orange-200 hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none"
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateNoteModal;
