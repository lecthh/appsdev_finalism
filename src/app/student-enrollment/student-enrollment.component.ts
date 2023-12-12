import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-student-enrollment',
  templateUrl: './student-enrollment.component.html',
  styleUrls: ['./student-enrollment.component.css']
})
export class StudentEnrollmentComponent {

  userName$!: Observable<string>;
  displayNameFirstHalf: string = '';

  constructor(public authService: AuthService, private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {}

  ngOnInit(): void {
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
