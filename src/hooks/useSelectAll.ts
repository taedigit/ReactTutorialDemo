import { useState, useCallback, useMemo } from 'react'

interface UseSelectAllProps {
  itemCount: number
  initialSelected?: boolean[]
}

interface UseSelectAllReturn {
  selectedItems: boolean[]
  allSelected: boolean
  someSelected: boolean
  handleSelectAll: (checked: boolean) => void
  handleSelectItem: (index: number, checked: boolean) => void
  getSelectedIndices: () => number[]
  getSelectedCount: () => number
  clearSelection: () => void
  setSelection: (selection: boolean[]) => void
}

export const useSelectAll = ({ 
  itemCount, 
  initialSelected 
}: UseSelectAllProps): UseSelectAllReturn => {
  const [selectedItems, setSelectedItems] = useState<boolean[]>(
    initialSelected || new Array(itemCount).fill(false)
  )

  const allSelected = useMemo(() => {
    return itemCount > 0 && selectedItems.length === itemCount && selectedItems.every(item => item)
  }, [selectedItems, itemCount])

  const someSelected = useMemo(() => {
    return selectedItems.some(item => item) && !allSelected
  }, [selectedItems, allSelected])

  const handleSelectAll = useCallback((checked: boolean) => {
    setSelectedItems(new Array(itemCount).fill(checked))
  }, [itemCount])

  const handleSelectItem = useCallback((index: number, checked: boolean) => {
    setSelectedItems(prev => {
      const newSelection = [...prev]
      newSelection[index] = checked
      return newSelection
    })
  }, [])

  const getSelectedIndices = useCallback(() => {
    return selectedItems.map((selected, index) => selected ? index : -1)
                      .filter(index => index !== -1)
  }, [selectedItems])

  const getSelectedCount = useCallback(() => {
    return selectedItems.filter(Boolean).length
  }, [selectedItems])

  const clearSelection = useCallback(() => {
    setSelectedItems(new Array(itemCount).fill(false))
  }, [itemCount])

  const setSelection = useCallback((selection: boolean[]) => {
    setSelectedItems(selection)
  }, [])

  // itemCount가 변경되면 selectedItems 배열 크기 조정
  const adjustedSelectedItems = useMemo(() => {
    if (selectedItems.length !== itemCount) {
      const newSelection = new Array(itemCount).fill(false)
      // 기존 선택 상태를 가능한 범위에서 유지
      for (let i = 0; i < Math.min(selectedItems.length, itemCount); i++) {
        newSelection[i] = selectedItems[i]
      }
      setSelectedItems(newSelection)
      return newSelection
    }
    return selectedItems
  }, [selectedItems, itemCount])

  return {
    selectedItems: adjustedSelectedItems,
    allSelected,
    someSelected,
    handleSelectAll,
    handleSelectItem,
    getSelectedIndices,
    getSelectedCount,
    clearSelection,
    setSelection
  }
} 