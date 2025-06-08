import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { note } from '../../interfaces/note.interface';
import { NoteService } from '../../services/noteService';

@Component({
  selector: 'app-notes',
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
})
export class Notes {
  deleteNote(noteId: number) {
    const note = document.getElementById(noteId.toString());
    if (!note) {
      console.error(`Note with ID ${noteId} not found.`);
      return;
    }
    if (note) {
      note.style.textDecoration = 'line-through';
    }
  }

  notes?: note[];

  noteService: NoteService = inject(NoteService);

  ngOnInit() {
    this.noteService.getNotesPage(0, 10).subscribe((data) => {
      this.notes = data.notes;
    });
  }

  dateRange: { start: Date | null; end: Date | null } = {
    start: null,
    end: null,
  };
}
