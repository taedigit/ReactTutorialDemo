interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onPrevious: () => void
  onNext: () => void
}

const PaginationControls = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  onPrevious, 
  onNext 
}: PaginationControlsProps) => {
  return (
    <div className="pagination-controls">
      <button 
        className="pagination-button" 
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        이전
      </button>
      
      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            className={`page-number ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      
      <button 
        className="pagination-button" 
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  )
}

export default PaginationControls 