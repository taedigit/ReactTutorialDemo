import { useState, useMemo } from 'react'

interface UsePaginationProps<T> {
  data: T[]
  itemsPerPage: number
  initialPage?: number
}

interface UsePaginationReturn<T> {
  currentPage: number
  totalPages: number
  currentData: T[]
  startIndex: number
  endIndex: number
  goToPage: (page: number) => void
  goToPrevious: () => void
  goToNext: () => void
  canGoPrevious: boolean
  canGoNext: boolean
}

export const usePagination = <T>({ 
  data, 
  itemsPerPage, 
  initialPage = 1 
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(data.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentData = data.slice(startIndex, endIndex)

    return {
      totalPages,
      startIndex,
      endIndex: Math.min(endIndex, data.length),
      currentData
    }
  }, [data, itemsPerPage, currentPage])

  const goToPage = (page: number) => {
    if (page >= 1 && page <= paginationData.totalPages) {
      setCurrentPage(page)
    }
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNext = () => {
    if (currentPage < paginationData.totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return {
    currentPage,
    totalPages: paginationData.totalPages,
    currentData: paginationData.currentData,
    startIndex: paginationData.startIndex,
    endIndex: paginationData.endIndex,
    goToPage,
    goToPrevious,
    goToNext,
    canGoPrevious: currentPage > 1,
    canGoNext: currentPage < paginationData.totalPages
  }
} 