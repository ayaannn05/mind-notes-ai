function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  if (!onPageChange) return null;

  const handlePrevious = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6">
      <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage <= 1}
          className={`px-3 py-2 ml-0 leading-tight border border-gray-300 rounded-l-lg ${
            currentPage <= 1
              ? "text-gray-300 bg-gray-50"
              : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          Previous
        </button>

        {/* page numbers */}
        {Array.from({ length: totalPages }).map((_, idx) => {
          const page = idx + 1;
          return (
            <button
              key={page}
              onClick={(e) => {
                e.preventDefault();
                if (page !== currentPage) onPageChange(page);
              }}
              className={`px-3 py-2 border-t border-b border-gray-300 ${
                page === currentPage
                  ? "bg-[#F57C05] text-white font-semibold"
                  : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className={`px-3 py-2 leading-tight border border-gray-300 rounded-r-lg ${
            currentPage >= totalPages
              ? "text-gray-300 bg-gray-50"
              : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          Next
        </button>
      </nav>
    </div>
  );
}

export default Pagination;
