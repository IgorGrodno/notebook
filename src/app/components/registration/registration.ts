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
    adminrole: new FormControl(),
  });

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  authService: AuthService = inject(AuthService);

  onSubmit(): void {
    this.authService.register(this.form.value).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err) => {
        console.error(err);
        this.isSignUpFailed = true;
        this.errorMessage = err.error.message;
      },
    });
  }
}
