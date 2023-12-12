import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

interface CollegeData {
  CollegeName: string;
}

interface ProgramData {
  ProgName: string;
}


@Component({
  selector: 'app-student-prospectus',
  templateUrl: './student-prospectus.component.html',
  styleUrls: ['./student-prospectus.component.css']
})

export class StudentProspectusComponent implements OnInit {

  college = '';

  colleges!: Observable<any[]>;
  programs!: Observable<any[]>;

  userName$!: Observable<string>;
  displayNameFirstHalf: string = '';

  constructor(public authService: AuthService, private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {}

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

  ngOnInit(): void {
    this.colleges = this.fetchColleges();
    this.userName$ = this.authService.getCurrentUserName();

    this.userName$.subscribe(displayName => {
      if (displayName !== 'User') {
        const displayNameParts = displayName.split(' ');
        if (displayNameParts.length > 0) {
          this.displayNameFirstHalf = displayNameParts.slice(0, Math.ceil(displayNameParts.length / 2)).join(' ');
        }
      }
    });
  }
}
