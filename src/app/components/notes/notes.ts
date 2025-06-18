import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Note } from '../../interfaces/note.interface';
import { NoteService } from '../../services/note.service';
import { EditNote } from '../edit-note/edit-note';
import { MatDialog } from '@angular/material/dialog';

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
  page: number = 0;
  @Input() title: string = '';
  @Input() dateRange = {
    start: null as Date | null,
    end: null as Date | null,
  };
  notes: Note[] = [];
  totalPages: number = 0;
  dialog: MatDialog = inject(MatDialog);
  noteService: NoteService = inject(NoteService);
  currentDate: string = '';
  noteTitle: string = '';
  noteText: string = '';

  editNote(id: number) {
    const noteToEdit = this.notes.find((note) => note.id === id);
    if (!noteToEdit) return;
    const dialogRef = this.dialog.open(EditNote, {
      width: '400px',
      data: {
        title: noteToEdit.title,
        text: noteToEdit.text,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updatedNote = {
          ...noteToEdit,
          title: result.updatedTitle,
          text: result.updatedText,
        };
        this.noteService.updateNote(updatedNote).subscribe(() => {
          this.applyFilters();
        });
      }
    });
  }

  applyFilters(): void {
    const startDateStr = this.dateRange.start
      ? this.dateRange.start.toISOString()
      : undefined;
    const endDateStr = this.dateRange.end
      ? this.dateRange.end.toISOString()
      : undefined;
    this.noteService
      .getNotesPage(this.page, 10, this.title, startDateStr, endDateStr)
      .subscribe((data) => {
        this.notes = data.notes;
        this.totalPages = data.totalPages;
      });
  }

  nextPage(): void {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.applyFilters();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.applyFilters();
    }
  }

  deleteNote(noteId: number) {
    const note = document.getElementById(noteId.toString());
    if (!note) {
      return;
    }
    if (note) {
      note.style.textDecoration = 'line-through';
      this.noteService.deleteNote(noteId).subscribe(() => {
        console.log(`Note with ID ${noteId} deleted.`);
      });
    }
  }

  ngOnInit() {
    this.applyFilters();
    this.updateDate();
    setInterval(() => this.updateDate(), 60000);
  }

  addNote() {
    if (!this.noteTitle.trim() || !this.noteText.trim()) {
      alert('Пожалуйста, заполните заголовок и текст заметки');
      return;
    }
    const note: Note = {
      id: 0,
      date: new Date().toISOString(),
      title: this.noteTitle,
      text: this.noteText,
    };
    this.noteService.addNote(note).subscribe({
      next: (response) => {
        this.noteTitle = '';
        this.noteText = '';
        this.applyFilters();
        const textarea = document.getElementById(
          'growing-textarea'
        ) as HTMLTextAreaElement;
        if (textarea) {
          textarea.style.height = 'auto';
          textarea.style.height = '50px';
        }
      },
      error: (error) => {
        console.error('Error adding note:', error);
      },
    });
  }

  updateDate() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    this.currentDate = date.toLocaleString('ru-RU', options);
  }

  resizeTextarea(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    if (!textarea) return;
    textarea.style.height = 'auto';
    const newHeight = textarea.scrollHeight;
    const step = 50;
    const adjustedHeight = Math.ceil(newHeight / step) * step;
    textarea.style.height = `${adjustedHeight}px`;
  }
}
