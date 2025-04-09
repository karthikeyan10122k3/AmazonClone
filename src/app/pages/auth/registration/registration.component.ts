import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  signUpForm: FormGroup;

  private authService = inject(AuthService)

  constructor(private router: Router) {
    this.signUpForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    const password = this.signUpForm.get('password')?.value;
    const confirmPassword = this.signUpForm.get('confirmPassword')?.value;

    if (this.signUpForm.valid && password === confirmPassword) {
      this.authService.signUp(this.signUpForm.value).subscribe({
        next: () => {
          alert('Sign-Up Successful');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Sign-Up Error:', err);
        }
      });
    }
    
  }
}
