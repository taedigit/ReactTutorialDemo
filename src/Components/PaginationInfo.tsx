interface PaginationInfoProps {
  totalItems: number
  startIndex: number
  endIndex: number
  currentPage: number
  totalPages: number
}

const PaginationInfo = ({ 
  totalItems, 
  startIndex, 
  endIndex, 
  currentPage, 
  totalPages 
}: PaginationInfoProps) => {
  return (
    <div className="pagination-info">
      총 {totalItems}개 항목 중 {startIndex + 1}-{endIndex}번째 표시 (페이지 {currentPage}/{totalPages})
    </div>
  )
}

export default PaginationInfo 