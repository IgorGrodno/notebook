import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addNote',
  imports: [CommonModule, FormsModule],
  templateUrl: './addNote..html',
  styleUrl: './addNote.css',
  encapsulation: ViewEncapsulation.None,
})
export class AddNote {
  isToggled: boolean = false;
  currentDate: string = '';

  ngOnInit() {
    this.updateDate();
    setInterval(() => this.updateDate(), 60000);
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
