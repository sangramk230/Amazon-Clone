import { Component, OnInit } from '@angular/core';
import {  FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  signupDiv: boolean = false;
  loginDiv: boolean = true;
  user: User = new User(0, '', '', '', '', '', '', '');

  constructor(private userService: UserService, private router: Router) {}

  toggleSignup(): void {
    this.signupDiv = true;
    this.loginDiv = false;
  }

  toggleLogin(): void {
    this.signupDiv = false;
    this.loginDiv = true;
  }

  signup(): void {
    this.userService.signup(this.user).subscribe(
      () => {
        alert('Signup successful!');
        this.loginDiv = true;
        this.signupDiv = false;
      },
      error => {
        console.error('Error signing up:', error);
        alert('Signup failed. Please try again.');
      }
    );
  }

  login(): void {
    this.userService.loginUser(this.user.email, this.user.password).subscribe(
      (next) => {
        if (next) {
          alert('Login successful!');
          this.router.navigateByUrl('home');
        } else {
          alert('Login failed. Please try again.');
        }
      },
      error => {
        alert('Login failed. Please try again.');
      }
    );
  }

}