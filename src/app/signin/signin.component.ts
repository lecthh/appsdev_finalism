import { Component } from '@angular/core';
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
    this.authService.signIn(this.email, this.password)
      .catch((error) => {
        console.log('Signin error: ', error.message);

        if (error.code === 'auth/too-many-requests') {
          alert('Too many unsuccessful login attempts. Please try again later.');
        } else {
          alert('Invalid email or password. Please check your credentials.');
        }
      });
  }
}

