import { useEffect } from 'react';
import css from './NoteModal.module.css';
import NoteForm from '../NoteForm/NoteForm';

interface NodeModalProps {
  onClose: () => void;
}

export default function NodeModal({ onClose }: NodeModalProps) {
  useEffect(() => {
    function handleEscCloser(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscCloser);
    return () => {
      document.removeEventListener('keydown', handleEscCloser);
    };
  }, [onClose]);

  function handleClickCloser(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }
  return (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleClickCloser}
    >
      <div className={css.modal}>
        <NoteForm />
      </div>
    </div>
  );
}
