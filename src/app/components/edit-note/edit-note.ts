import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-note',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './edit-note.html',
  styleUrl: './edit-note.css',
})
export class EditNote {
  constructor(
    public dialogRef: MatDialogRef<EditNote>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; text: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close({
      updatedTitle: this.data.title,
      updatedText: this.data.text,
    });
  }
}
