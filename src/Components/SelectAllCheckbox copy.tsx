interface SelectAllCheckboxProps {
  checked: boolean
  indeterminate?: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

const SelectAllCheckbox = ({ 
  checked, 
  indeterminate = false, 
  onChange, 
  disabled = false,
  className = ''
}: SelectAllCheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  return (
    <input
      type="checkbox"
      checked={checked}
      ref={(input) => {
        if (input) {
          input.indeterminate = indeterminate
        }
      }}
      onChange={handleChange}
      disabled={disabled}
      className={className}
    />
  )
}

export default SelectAllCheckbox 