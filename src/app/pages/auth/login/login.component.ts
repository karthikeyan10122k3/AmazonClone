import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [NgIf,ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  private authService = inject(AuthService)

constructor(private router: Router){
  this.loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]),
    password: new FormControl("", [Validators.required,]),
  })
}

submit() {
  
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        console.log('Login Success:', res);
        this.router.navigate(['/cart']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid email or password');
      }
    });
  }
}



}
