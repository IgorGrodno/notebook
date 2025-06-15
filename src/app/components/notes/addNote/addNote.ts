import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../../services/noteService';
import { Note } from '../../../interfaces/note.interface';

@Component({
  selector: 'app-addNote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addNote.html',
  styleUrls: ['./addNote.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddNote {
  noteService = inject(NoteService);
  currentDate: string = '';
  noteTitle: string = '';
  noteText: string = '';

  ngOnInit() {
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
        console.log('Note added successfully:', response);
        this.noteTitle = '';
        this.noteText = '';
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
    textarea.style.height = 'auto';
    const newHeight = textarea.scrollHeight;
    const step = 50;
    const adjustedHeight = Math.ceil(newHeight / step) * step;
    textarea.style.height = `${adjustedHeight}px`;
  }
}
