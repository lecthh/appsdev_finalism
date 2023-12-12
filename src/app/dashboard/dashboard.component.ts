// dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName$!: Observable<string>;
  displayNameFirstHalf: string = '';

  constructor(public authService: AuthService, private router: Router) {}

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

  goToProspectus(): void {
    this.router.navigate(['/student-prospectus']);
  }

  
}