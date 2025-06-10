import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearchChange: (searchQuery: string) => void;
}

export default function SearchBox({ onSearchChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={event => {
        onSearchChange(event.target.value);
      }}
    />
  );
}
