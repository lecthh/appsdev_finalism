import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email = '';
  password = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  signin(): void {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        console.log('User signed in successfully!');
        this.router.navigate(['/dashboard']); // Navigate to the dashboard or any other route after successful signin
      })
      .catch((error) => {
        console.log('Signin error: ', error.message);

        if (error.code === 'auth/too-many-requests') {
          // Too many unsuccessful login attempts
          alert('Too many unsuccessful login attempts. Please try again later.');
        } else {
          // Handle other error cases
          alert('Invalid email or password. Please check your credentials.');
        }
      });
  }
}
