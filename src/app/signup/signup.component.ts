import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  studentNumber = '';
  yearLevel = '';
  college = '';
  program = '';

  colleges!: Observable<any[]>;
  programs!: Observable<any[]>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {}

  ngOnInit() {
    this.colleges = this.fetchColleges();
  }

  fetchColleges(): Observable<any[]> {
    return this.afs.collection('Colleges').snapshotChanges().pipe(
      map((colleges: any[]) => {
        return colleges.map(college => ({
          value: college.payload.doc.id, 
          label: college.payload.doc.data()['CollegeName']
        }));
      })
    );
  }
  
  fetchPrograms(collegeDocument: string): Observable<any[]> {
    console.log('College Document:', collegeDocument);
    
    const collegeRef = this.afs.collection('Colleges').doc(collegeDocument).ref;
  
    return this.afs.collection('Programs', ref =>
      ref.where('ProgCollege', '==', collegeRef)
    ).valueChanges().pipe(
      map(programs => {
        return programs.map((program: any) => ({
          value: program.ProgName,
          label: program.ProgName
        }));
      }),
      catchError(error => {
        console.error('Error fetching programs:', error);
        return [];
      })
    );
  }
  
  onCollegeSelected(): void {
    console.log('onCollegeSelected called');
    this.programs = this.fetchPrograms(this.college)
  }

  signup(): void {
    const addtlData = {
      displayName: `${this.firstName} ${this.lastName}`,
      studentNumber: this.studentNumber,
      email: this.email,
      password: this.password,
      yearLevel: this.yearLevel,
      college: this.college,
      program: this.program
    };

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
