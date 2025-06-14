import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { NotesPage } from '../interfaces/notesPage.interface';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpClient) {}

  private noteUrl = 'http://localhost:8080/api/notes';

  getNotesPage(
    pageNumber: number,
    pageSize: number,
    title?: string,
    startDateStr?: string,
    endDateStr?: string
  ) {
    let url = `${this.noteUrl}?page=${pageNumber}&size=${pageSize}`;
    if (title) {
      url += `&title=${encodeURIComponent(title)}`;
    }
    if (startDateStr) {
      url += `&startDate=${startDateStr}`;
    }
    if (endDateStr) {
      url += `&endDate=${endDateStr}`;
    }
    return this.http.get<NotesPage>(url);
  }

  addNote(note: Note) {
    console.log('Adding note:', note);
    return this.http.post<Note>(this.noteUrl, note);
  }

  deleteNote(id: number) {
    return this.http.delete(`${this.noteUrl}/${id}`);
  }

  updateNote(note: Note) {
    return this.http.put<Note>(`${this.noteUrl}/${note.id}`, note);
  }
}
