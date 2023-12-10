import { Component } from '@angular/core';
import { AuthService } from '../auth.service';


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

  constructor(private authService: AuthService) {}

  signup(): void {
    const addtlData = {
      displayName: `${this.firstName} ${this.lastName}`,
      studentNumber: this.studentNumber,
      yearLevel: this.yearLevel,
      college: this.college,
      program: this.program
    }
  
    this.authService.signUp(this.email, this.password, addtlData);
  }

}
