import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface UserDocument {
  enrolledTo?: string[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName$!: Observable<string>;
  displayNameFirstHalf: string = '';
  enrolledSubjectsCount: number = 0;
  totalUnits: number = 0;
  router: any;

  constructor(public authService: AuthService, private afs: AngularFirestore) {}

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

    // Get the current user's enrolled subjects
    this.authService.getUid().subscribe(currentID => {
      this.afs.collection('users').doc<UserDocument>(currentID).get().subscribe(userDoc => {
        const enrolledSubjects: string[] = userDoc.data()?.enrolledTo || [];
        this.enrolledSubjectsCount = enrolledSubjects.length;

        // Calculate total units based on enrolled subjects (assuming each subject is 3 units)
        this.totalUnits = this.enrolledSubjectsCount * 3;
      });
    });
  }

  // ... (existing code)

  goToProspectus(): void {
    this.router.navigate(['/student-prospectus']);
  }
}
