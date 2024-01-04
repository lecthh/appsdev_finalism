import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface CollegeData {
  CollegeName: string;
}

interface ProgramData {
  ProgName: string;
  ProgCollege: string;
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  studentNumber = '';
  yearLevel = '';
  college = '';
  program = '';
  isAdmin = false;

  colleges!: Observable<any[]>;
  programs!: Observable<any[]>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {}

  ngOnInit() {
    this.colleges = this.fetchColleges();
  }

  fetchColleges(): Observable<any[]> {
    return this.afs.collection('Colleges').snapshotChanges().pipe(
      map((colleges: any[]) => {
        return colleges.map(college => {
          const data = college.payload.doc.data() as CollegeData;
          return {
            value: college.payload.doc.id,
            label: data.CollegeName
          };
        });
      })
    );
  }

  fetchPrograms(collegeDocument: string): Observable<any[]> {
    console.log('College Document:', collegeDocument);

    const collegeRef = this.afs.collection('Colleges').doc(collegeDocument).ref;

    return this.afs.collection('Programs', ref =>
      ref.where('ProgCollege', '==', collegeRef)
    ).snapshotChanges().pipe(
      map(programs => {
        return programs.map(program => {
          const data = program.payload.doc.data() as ProgramData;
          return {
            value: program.payload.doc.id,
            label: data.ProgName
          };
        });
      }),
      catchError(error => {
        console.error('Error fetching programs:', error);
        return [];
      })
    );
  }

  onCollegeSelected(): void {
    console.log('onCollegeSelected called');
    this.programs = this.fetchPrograms(this.college);
  }

  addStudent(): void {
    console.log("add is working")
    const addtlData = {
      displayName: `${this.firstName} ${this.lastName}`,
      studentNumber: this.studentNumber,
      email: this.email,
      password: 'temp123',
      yearLevel: this.yearLevel,
      college: this.college,
      program: this.program,
      isAdmin: this.isAdmin
    };

    this.afAuth.createUserWithEmailAndPassword(this.email, addtlData.password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        return user.updateProfile({
          displayName: `${this.firstName} ${this.lastName}`
        }).then(() => {
          return this.afs.collection('users').doc(user.uid).set({
            displayName: addtlData.displayName,
            email: addtlData.email,
            college: addtlData.college, 
            password: addtlData.password,
            program: addtlData.program,
            studentNumber: addtlData.studentNumber,
            yearLevel: addtlData.yearLevel
          });
        });
      } else {
        throw new Error("User not found after sign-up");
      }
    })
    .then(() => {
      console.log("Student registered:", this.afAuth.currentUser);
      alert('Student successfully added to database');
    })
    .catch((error) => {
      console.error('Registration error:', error);
    
      // Log the detailed error message from Firebase
      console.log('Firebase Error Message:', error.message);
    
      // Handle specific error codes if needed
      if (error.code === 'auth/email-already-in-use') {
        alert('The email address is already in use by another account.');
      } else if (error.code === 'auth/weak-password') {
        alert('The password is too weak.');
      } else if (error.code === 'auth/invalid-email') {
        alert('The email address is invalid.');
      } else {
        alert('An error occurred during registration. Please try again.');
      }
    });
    
  }
}
