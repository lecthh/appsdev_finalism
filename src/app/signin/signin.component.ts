import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  signin(): void {
    this.authService.signIn(this.email.trim(), this.password);
  }
 }