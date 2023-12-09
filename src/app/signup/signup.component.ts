import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  studentNumber = '';
  yearLevel = '';
  college = '';
  program = '';

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {}

  signup(): void {
    const addtlData = {
      displayName: `${this.firstName} ${this.lastName}`,
      studentNumber: this.studentNumber,
      yearLevel: this.yearLevel,
      college: this.college,
      program: this.program
    }

    this.afAuth.createUserWithEmailAndPassword(this.email, this.password).then((userCredential) => {
      const user = userCredential.user;

      return this.afs.collection('users').doc(user?.uid).set(addtlData);
    })
    .then(() => {
      console.log("Student registered: ", this.afAuth.currentUser);
      this.router.navigate(['/signin']);
    })
    .catch((error) => {
      console.log('Registration error: ', error.message);
    });
  }

}
