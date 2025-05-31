import { useCallback } from 'react'

interface RowCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
  id?: string
  'aria-label'?: string
  title?: string
}

const RowCheckbox = ({ 
  checked, 
  onChange, 
  disabled = false,
  className = '',
  id,
  'aria-label': ariaLabel,
  title
}: RowCheckboxProps) => {
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }, [onChange])

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange}
      disabled={disabled}
      className={className}
      id={id}
      aria-label={ariaLabel}
      title={title || (checked ? '선택 해제' : '선택')}
    />
  )
}

export default RowCheckbox 