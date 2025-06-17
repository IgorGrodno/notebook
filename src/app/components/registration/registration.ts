import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/Auth.service';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
  form: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  authService: AuthService = inject(AuthService);

  onSubmit(): void {
    this.authService.register(this.form.value).subscribe({
      next: (response) => {
        if (response.success) {
          alert(response.message);
          this.form.reset();
        } else {
          alert(response.message);
        }
      },
      error: (err) => {
        try {
          if (err.status === 400 && err.error && err.error.message) {
            // Специально ловим ошибки валидации или бизнес-ошибки
            alert(err.error.message);
          } else if (err.status === 0) {
            // Например, ошибка сети или CORS
            alert('Сервер недоступен. Проверьте подключение.');
          } else if (err.error && typeof err.error === 'string') {
            // Иногда сервер отдаёт plain text
            alert(err.error);
          } else {
            alert('Произошла ошибка при соединении с сервером.');
          }
        } catch (e) {
          alert('Ошибка внутри обработки: ' + e);
        }
      },
    });
  }
}
