import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { note } from '../interfaces/note.interface';
import { searchCriteries } from '../interfaces/searchCriteries.interface';
import { notesPage } from '../interfaces/notesPage.interface';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpClient) {}

  private noteUrl = 'fakeDB/notes.json';

  getNotesPage(
    pageNumber: number,
    pageSize: number,
    searchCriteries?: searchCriteries
  ) {
    let url = `${this.noteUrl}?page=${pageNumber}&size=${pageSize}`;

    if (searchCriteries) {
      if (searchCriteries.searchText) {
        url += `&title=${encodeURIComponent(searchCriteries.searchText)}`;
      }
      if (searchCriteries.startDate) {
        url += `&startDate=${searchCriteries.startDate.toISOString()}`;
      }
      if (searchCriteries.endDate) {
        url += `&endDate=${searchCriteries.endDate.toISOString()}`;
      }
    }

    return this.http.get<notesPage>(url);
  }

  addNote(note: note) {
    return this.http.post<note>(this.noteUrl, note);
  }
}
