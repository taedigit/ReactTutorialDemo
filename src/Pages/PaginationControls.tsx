interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onPrevious: () => void
  onNext: () => void
  onFirst: () => void
  onLast: () => void
}

const PaginationControls = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  onPrevious, 
  onNext,
  onFirst,
  onLast
}: PaginationControlsProps) => {
  return (
    <div className="pagination-controls">
      <button 
        className="pagination-button" 
        onClick={onFirst}
        disabled={currentPage === 1}
        aria-label="처음"
      >
        {'<<'}
      </button>
      <button 
        className="pagination-button" 
        onClick={onPrevious}
        disabled={currentPage === 1}
        aria-label="이전"
      >
        {'<'}
      </button>
      
      <div className="page-numbers">
        {(() => {
          const pageGroup = Math.floor((currentPage - 1) / 10);
          const startPage = pageGroup * 10 + 1;
          const endPage = Math.min(startPage + 9, totalPages);
          const pages = [];
          for (let page = startPage; page <= endPage; page++) {
            pages.push(
              <button
                key={page}
                className={`page-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            );
          }
          return pages;
        })()}
      </div>
      
      <button 
        className="pagination-button" 
        onClick={onNext}
        disabled={currentPage === totalPages}
        aria-label="다음"
      >
        {'>'}
      </button>
      <button 
        className="pagination-button" 
        onClick={onLast}
        disabled={currentPage === totalPages}
        aria-label="끝"
      >
        {'>>'}
      </button>
    </div>
  )
}

export default PaginationControls 