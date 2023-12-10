import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName$!: Observable<string>;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.userName$ = this.authService.getCurrentUserName();
  }
}
