import { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  width?: string
  height?: string
  showCloseButton?: boolean
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  width = '500px',
  height = 'auto',
  showCloseButton = true
}: ModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div 
        className="modal-content" 
        style={{ width, height }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="modal-header">
            <h3>{title}</h3>
            {showCloseButton && (
              <button className="modal-close-button" onClick={onClose}>
                ×
              </button>
            )}
          </div>
        )}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal 