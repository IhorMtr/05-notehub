import axios from 'axios';
import type Note from '../types/note';

interface Response {
  notes: Note[];
  totalPages: number;
}

const apiKey = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api/notes',
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

export async function fetchNotes(
  pageNumber: number,
  inputQuery?: string
): Promise<Response> {
  const params: {
    page: number;
    perPage: number;
    search?: string;
  } = {
    page: pageNumber,
    perPage: 10,
  };

  if (inputQuery) {
    params.search = inputQuery;
  }

  const response = await api.get<Response>('', { params });

  return response.data;
}

export async function createNote(note: Note): Promise<Note> {
  const response = await api.post<Note>('', note);

  return response.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const response = await api.delete<Note>(`/${id}`);

  return response.data;
}
