import { Note } from './note.interface';

export interface NotesPage {
  notes: Note[];
  toalNotes: number;
  pageSize: number;
  pageIndex: number;
  totalPages: number;
}
