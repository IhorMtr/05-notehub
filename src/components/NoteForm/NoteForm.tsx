import css from './NoteForm.module.css';
import { useId } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import { createNote } from '../../services/noteService';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function NoteForm() {
  const notify = () => toast.error('Something went wrong, please, try again.');
  const fieldId = useId();
  const queryClient = useQueryClient();

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: '' }}
      onSubmit={async (values, { resetForm }) => {
        try {
          await createNote(values);
          resetForm();
          queryClient.invalidateQueries({ queryKey: ['notes'] });
        } catch {
          notify();
        }
      }}
      validationSchema={object({
        title: string()
          .min(3, 'Title must be at least 3 characters')
          .max(50, 'Title must be at most 50 characters')
          .required('Title is required'),

        content: string().max(500, 'Content must be at most 500 characters'),
        tag: string()
          .oneOf(
            ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'],
            'Invalid tag'
          )
          .required('Tag is required'),
      })}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field
              id={`${fieldId}-title`}
              type="text"
              name="title"
              className={css.input}
            />
            <ErrorMessage component="span" name="title" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field
              as="textarea"
              id={`${fieldId}-content`}
              name="content"
              rows="8"
              className={css.textarea}
            />
            <ErrorMessage
              component="span"
              name="content"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field
              as="select"
              id={`${fieldId}-tag`}
              name="tag"
              className={css.select}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage component="span" name="tag" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton}>
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
