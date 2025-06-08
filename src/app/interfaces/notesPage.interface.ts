import { note } from './note.interface';

export interface notesPage {
  notes: note[];
  toalNotes: number;
  pageSize: number;
  pageIndex: number;
  totalPages: number;
}
