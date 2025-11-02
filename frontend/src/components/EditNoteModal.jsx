import { useState } from "react";
import toast from "react-hot-toast";
import { updateNote } from "../apis/notes";
import { FaTimes, FaSave, FaEdit } from "react-icons/fa";

const EditNoteModal = ({ onClose, note, onSuccess }) => {
  const [title, setTitle] = useState(note ? note.title : "");
  const [loading, setLoading] = useState(false);

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await updateNote(note._id, { title });
      toast.success("Note updated successfully");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  // Close modal on ESC key
  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-xl shadow-2xl transform transition-all animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F57C05] to-[#ff9642] flex items-center justify-center shadow-md">
              <FaEdit className="text-white w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Edit Note</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
            aria-label="Close modal"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSaveEdit} className="p-6">
          <div className="mb-6">
            <label
              htmlFor="note-title"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Note Title
            </label>
            <input
              id="note-title"
              type="text"
              placeholder="Enter note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F57C05] focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400 font-medium"
              autoFocus
              disabled={loading}
            />
            <p className="mt-2 text-xs text-gray-500">
              {title.length}/100 characters
            </p>
          </div>

          {/* Original Note Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Original Title
            </p>
            <p className="text-sm text-gray-700 font-medium">
              {note?.title || "Untitled Note"}
            </p>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 transform hover:scale-105"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="group flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#F57C05] to-[#ff9642] hover:from-[#ff9642] hover:to-[#F57C05] rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={loading || !title.trim()}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaSave className="w-4 h-4 transform group-hover:rotate-12 transition-transform" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoteModal;
