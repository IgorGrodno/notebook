import { Component } from '@angular/core';
import { AddNote } from './components/addNote/addNote.';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Notes } from './components/notes/notes';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, AddNote, Notes],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'notebook';

  darkMode: boolean = false;

  toggleTheme(darkMode: boolean) {
    const classList = document.body.classList;
    if (darkMode) {
      classList.add('dark-theme');
    } else {
      classList.remove('dark-theme');
    }
  }
}
