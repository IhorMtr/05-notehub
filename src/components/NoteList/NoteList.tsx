import css from './NoteList.module.css';
import type Note from '../../types/note';
import { deleteNote } from '../../services/noteService';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const notify = () => toast.error('Something went wrong, please, try again.');

  if (!notes || notes.length === 0) return null;

  async function handleDelete(id: number) {
    try {
      await deleteNote(id);
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    } catch {
      notify();
    }
  }

  return (
    <ul className={css.list}>
      {notes.map((note: Note) => {
        return (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button
                className={css.button}
                onClick={() => {
                  if (note.id !== undefined) {
                    handleDelete(note.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
