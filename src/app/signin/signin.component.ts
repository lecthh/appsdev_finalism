import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Auth } from '@angular/fire/auth';
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
    const trimmedEmail = this.email.trim();
    console.log('Trimmed Email:', trimmedEmail);
  
    this.afAuth.signInWithEmailAndPassword(trimmedEmail, this.password)
      .then((userCredential) => {
        console.log('User signed in:', userCredential.user);
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.log('Sign-in error:', error.message);
      });
  }  
 }