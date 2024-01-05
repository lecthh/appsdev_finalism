import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { catchError, map,switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { forkJoin } from 'rxjs';

interface Subject {
  id: string;
  offerCode: string;
  descriptiveTitle: string;
  subjectNumber: string;
  units: number;
}

@Component({
  selector: 'app-student-prospectus',
  templateUrl: './student-prospectus.component.html',
  styleUrls: ['./student-prospectus.component.css']
})

export class StudentProspectusComponent implements OnInit {
  userName$!: Observable<string>;
  displayNameFirstHalf: string = '';
  currentID: string = '';
  userID$!: Observable<string>;

  EnrolledSubjects: Subject[] = [];

  constructor(public authService: AuthService, private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {}

  ngOnInit(): void {
    this.userName$ = this.authService.getCurrentUserName();
    this.userID$ = this.authService.getUid();

    this.userID$.pipe(
      switchMap(uid => {
        return this.afs.collection('users').doc(uid).valueChanges();
      }),
      catchError(error => {
        console.error('Error fetching user data:', error);
        return [];
      }),
      map((userDoc: any) => userDoc.enrolledTo || [])
    ).subscribe(enrolledSubjects => {
      console.log('Enrolled Subjects:', enrolledSubjects);

      forkJoin<Subject[]>(
        enrolledSubjects.map((subjectCode: any) =>
          this.afs.collection('Subjects', ref => ref.where('code', '==', subjectCode)).valueChanges() as Observable<Subject[]>
        )
      ).subscribe(subjectsArrays => {
        this.EnrolledSubjects = subjectsArrays.flat();
      });
    });
  }

}
