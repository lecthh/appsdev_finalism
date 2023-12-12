import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-enrollees',
  templateUrl: './view-enrollees.component.html',
  styleUrls: ['./view-enrollees.component.css']
})
export class ViewEnrolleesComponent implements OnInit {
  college = '';
  colleges!: Observable<any[]>;
  enrollees!: Observable<any[]>; // Corrected type

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

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

  onCollegeSelected(): void {
    console.log('onCollegeSelected called');
    if (this.college) {
      this.enrollees = this.fetchEnrollees(this.college);
    }
  }

  fetchEnrollees(collegeDocument: string): Observable<any[]> {
    console.log('Fetching enrollees for college:', collegeDocument);
    return this.afs.collection('users', ref => ref.where('College', '==', collegeDocument))
      .snapshotChanges().pipe(
        map((enrollees: any[]) => {
          console.log('Enrollees data:', enrollees);
          return enrollees.map(enrollee => {
            const data = enrollee.payload.doc.data();
            return {
              displayName: data.displayName,
              yearLevel: data.yearLevel,
              program: data.program
            };
          });
        }),
        catchError(error => {
          console.error('Error fetching enrollees:', error);
          return [];
        })
      );
  }
  
  
}
