import Modal from './Modal'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  confirmButtonStyle?: 'primary' | 'danger' | 'warning'
}

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = '확인',
  message,
  confirmText = '확인',
  cancelText = '취소',
  confirmButtonStyle = 'primary'
}: ConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} width="400px" showCloseButton={false}>
      <div className="confirm-dialog">
        <p className="confirm-message">{message}</p>
        <div className="confirm-buttons">
          <button 
            className={`confirm-button ${confirmButtonStyle}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
          <button 
            className="cancel-button"
            onClick={onClose}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDialog 