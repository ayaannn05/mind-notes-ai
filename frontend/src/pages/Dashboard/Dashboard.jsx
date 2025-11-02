import React, { useEffect, useState } from "react";
import { getUser } from "../../apis/auth";
import { getAllNotes, deleteNote } from "../../apis/notes";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaEdit,
  FaChevronDown,
  FaPlus,
  FaTrash,
  FaFileAlt,
  FaLightbulb,
} from "react-icons/fa";
import CreateNoteModal from "../../components/CreateNoteModal";
import EditNoteModal from "../../components/EditNoteModal";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [noteToEdit, setNoteToEdit] = useState(null);

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const { data } = await getUser();
        setUser(data?.data);
      } catch (error) {
        toast.error(error);
      }
    };
    getUserDetail();
  }, []);

  const getNotes = async () => {
    try {
      const data = await getAllNotes();
      setNotes(data.notes);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteNote(noteToDelete);
      setNotes(notes.filter((note) => note._id !== noteToDelete));
      toast.success("Note deleted successfully");
      setDeleteModalOpen(false);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Your Notes
            </h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none sm:min-w-[300px]">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F57C05] focus:border-transparent"
                />
              </div>
              <button
                className="flex items-center justify-center px-4 sm:px-6 py-2.5 bg-[#F57C05] text-white rounded-lg hover:bg-[#E06900] transition-all transform hover:scale-105 shadow-md w-full sm:w-auto"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <FaPlus className="mr-2" />
                Create Note
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center  gap-4 sm:gap-6">
            {filteredNotes.map((note, index) => (
              <div
                key={index}
                className="group w-full max-w-3xl bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:border-[#F57C05]/20 hover:-translate-y-1"
              >
                <div className="p-5 sm:p-7">
                  {/* Header Section */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#F57C05] to-[#ff9642] text-white text-sm sm:text-base font-bold shadow-md">
                          {index + 1}
                        </span>
                        <h3 className="text-lg sm:text-2xl font-bold text-gray-800 group-hover:text-[#F57C05] transition-colors duration-300">
                          {note.title}
                        </h3>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsEditModalOpen(true);
                          setNoteToEdit(note);
                        }}
                        className="opacity-100 sm:opacity-0 group-hover:opacity-100 text-gray-400 hover:text-[#F57C05] transition-all duration-300 p-2.5 hover:bg-orange-50 rounded-xl transform hover:scale-110"
                        aria-label="Edit note"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setNoteToDelete(note._id);
                          setDeleteModalOpen(true);
                        }}
                        className="opacity-100 sm:opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-300 p-2.5 hover:bg-red-50 rounded-xl transform hover:scale-110"
                        aria-label="Delete note"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="mb-5">
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base line-clamp-2">
                      {note.summary || "No content available"}
                    </p>
                  </div>

                  {/* Footer Section */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-medium">
                        {new Date(note.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <Link
                      to={`/note/${note._id}`}
                      className="group/link flex items-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#F57C05] to-[#ff9642] hover:from-[#ff9642] hover:to-[#F57C05] rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <span>View Note</span>
                      <svg
                        className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <div className="text-center py-8 sm:py-16 bg-white rounded-2xl shadow-sm mt-6">
              {searchTerm ? (
                <div className="space-y-4 px-4">
                  <FaSearch className="mx-auto text-gray-300 text-4xl sm:text-5xl mb-4" />
                  <p className="text-gray-500 text-lg sm:text-xl">
                    No notes found matching your search
                  </p>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6 px-4">
                  <div className="flex justify-center">
                    <div className="relative">
                      <FaFileAlt className="text-5xl sm:text-7xl text-[#F57C05] opacity-20" />
                      <FaLightbulb className="absolute -top-2 -right-2 text-2xl sm:text-3xl text-[#F57C05] animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                      Start Your Note-Taking Journey
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base">
                      Create your first note and transform your ideas into
                      organized thoughts. Upload files, add text, or import
                      content - it's all possible!
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[#F57C05] text-white rounded-lg hover:bg-[#E06900] transition-all transform hover:scale-105 shadow-md text-sm sm:text-base"
                  >
                    <FaPlus className="mr-2" />
                    Create Your First Note
                  </button>
                  <div className="flex justify-center gap-6 sm:gap-8 pt-6 sm:pt-8">
                    <div className="text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2">
                        <FaFileAlt className="text-[#F57C05] text-sm sm:text-base" />
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Upload Files
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2">
                        <FaLightbulb className="text-[#F57C05] text-sm sm:text-base" />
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Capture Ideas
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {isCreateModalOpen && (
        <CreateNoteModal onClose={() => setIsCreateModalOpen(false)} />
      )}

      {isEditModalOpen && (
        <EditNoteModal
          note={noteToEdit}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={getNotes}
        />
      )}

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 max-w-md w-full mx-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
              Delete Note
            </h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Are you sure you want to delete this note? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
