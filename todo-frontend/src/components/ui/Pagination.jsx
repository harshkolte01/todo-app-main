import Button from './Button';

/**
 * Pagination Component
 * 
 * Displays pagination controls for navigating through pages.
 * Works with the backend API pagination response.
 * 
 * Props:
 * - currentPage: number - Current active page (1-based)
 * - totalPages: number - Total number of pages
 * - onPageChange: function - Called when page changes, receives page number
 * - hasNextPage: boolean - Whether there's a next page (optional)
 * - hasPrevPage: boolean - Whether there's a previous page (optional)
 * 
 * Usage Example:
 * <Pagination 
 *   currentPage={1}
 *   totalPages={5}
 *   onPageChange={(page) => setCurrentPage(page)}
 *   hasNextPage={true}
 *   hasPrevPage={false}
 * />
 */

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  hasNextPage = true, 
  hasPrevPage = true 
}) => {
  
  // Don't show pagination if there's only 1 page or no pages
  if (totalPages <= 1) {
    return null;
  }
  
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Show max 5 page numbers at a time
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      
      {/* Previous Button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage || currentPage === 1}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Button>
      
      {/* First Page (if not in view) */}
      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            1
          </button>
          {pageNumbers[0] > 2 && (
            <span className="text-gray-500">...</span>
          )}
        </>
      )}
      
      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
      
      {/* Last Page (if not in view) */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="text-gray-500">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}
      
      {/* Next Button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage || currentPage === totalPages}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Button>
      
      {/* Page Info */}
      <span className="ml-2 text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;