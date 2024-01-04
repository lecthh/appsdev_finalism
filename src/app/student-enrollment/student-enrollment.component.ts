import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

interface UserDocument {
  college: string;
  program: string;
  enrolledTo?: string[];
}

interface CollegeDocument {
  CollegeName: string;
}

interface ProgramDocument {
  ProgName: string;
}

interface Subject {
  id: string;
  offerCode: string;
  descriptiveTitle: string;
  subjectNumber: string;
  units: number;
}

@Component({
  selector: 'app-student-enrollment',
  templateUrl: './student-enrollment.component.html',
  styleUrls: ['./student-enrollment.component.css']
})
export class StudentEnrollmentComponent implements OnInit {
  checkedOfferCodes: string[] = [];
  checkboxStates: { [key: string]: boolean } = {};

  userName$!: Observable<string>;
  userID$!: Observable<string>;
  displayNameFirstHalf: string = '';
  currentID: string = '';
  course: string = '';
  subjects: Subject[] = [];
  currentUnits: number = 0;
  maxUnits: number = 24;

  constructor(
    public authService: AuthService,
    private afs: AngularFirestore,
  ) {}

  ngOnInit(): void {
    this.userName$ = this.authService.getCurrentUserName();
    this.userID$ = this.authService.getUid();
  
    this.userName$.subscribe(displayName => {
      if (displayName !== 'User') {
        const displayNameParts = displayName.split(' ');
        if (displayNameParts.length > 0) {
          this.displayNameFirstHalf = displayNameParts.slice(0, Math.ceil(displayNameParts.length / 2)).join(' ');
        }
      }
    });
  
    this.userID$.subscribe(uid => {
      this.currentID = uid;
      console.log("current ID: " + this.currentID);
  
      // Fetch enrolled subjects
      this.afs.collection('users').doc<UserDocument>(this.currentID).get().subscribe(userDoc => {
        const enrolledSubjects: string[] = userDoc.data()?.enrolledTo || [];
    
        // Initialize checkbox states and calculate currentUnits based on enrolledTo field
        this.subjects.forEach(subject => {
          this.checkboxStates[subject.id] = enrolledSubjects.includes(subject.offerCode);
    
          if (this.checkboxStates[subject.id]) {
            this.currentUnits += subject.units;
          }
        });
      });
  
      this.afs.collection('users').doc<UserDocument>(this.currentID).get().subscribe(userDoc => {
        const userCollege = userDoc.data()?.college;
        const userProgram = userDoc.data()?.program;
        console.log("1. " + userCollege);
  
        this.afs.collection('Programs').doc<ProgramDocument>(userProgram).get().subscribe(programDoc => {
          const programName = programDoc.data()?.ProgName;
          if (programName) {
            this.course = programName;
          }
        });
  
        this.afs.collection('Colleges').doc<CollegeDocument>(userCollege).get().subscribe(collegeDoc => {
          const collegeName = collegeDoc.data()?.CollegeName;
          console.log("2. " + collegeName);
  
          this.afs.collection('Subjects', ref => ref.where('college', '==', collegeName)).snapshotChanges().subscribe(subjects => {
            this.subjects = subjects.map(subject => {
              const data = subject.payload.doc.data() as { code: string, name: string, units: number };
              return {
                id: subject.payload.doc.id,
                offerCode: data.code,
                descriptiveTitle: data.name,
                subjectNumber: this.generateSubjectNumber(data.name),
                units: 3.0,
              };
            });
  
            // After fetching subjects, update checkbox states again
            this.afs.collection('users').doc<UserDocument>(this.currentID).get().subscribe(userDoc => {
              const enrolledSubjects: string[] = userDoc.data()?.enrolledTo || [];
  
              // Initialize checkbox states based on enrolledTo field
              this.subjects.forEach(subject => {
                this.checkboxStates[subject.id] = enrolledSubjects.includes(subject.offerCode);
              });
            });
          });
        });
      });
    });
  }
  

  generateSubjectNumber(title: string): string {
    const result = title.replace(/[^A-Z0-9]/g, '');
    return result;
  }

  handleCheckboxChange(subject: Subject, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const unitsToAdd = isChecked ? subject.units : -subject.units;

    if (this.currentUnits + unitsToAdd <= this.maxUnits && this.currentUnits + unitsToAdd >= 0) {
      this.currentUnits += unitsToAdd;

      // Update the checkbox state
      this.checkboxStates[subject.id] = isChecked;

      // Update the checkedOfferCodes array
      if (isChecked) {
        // Add offer code to the array
        this.checkedOfferCodes.push(subject.offerCode);
      } else {
        // Remove offer code from the array
        const index = this.checkedOfferCodes.indexOf(subject.offerCode);
        if (index !== -1) {
          this.checkedOfferCodes.splice(index, 1);
        }
      }
    } else if (this.currentUnits >= this.maxUnits) {
      alert("You cannot exceed the maximum available units.");

      // Uncheck the checkbox that triggered the alert
      this.checkboxStates[subject.id] = false;
    }
  }

enrollSubjects(): void {
  // Check if there are checked offer codes
  if (this.checkedOfferCodes.length > 0) {
    // Fetch the current enrolled subjects
    this.afs.collection('users').doc<UserDocument>(this.currentID).get().subscribe(userDoc => {
      const enrolledSubjects: string[] = userDoc.data()?.enrolledTo || [];

      // Combine the existing and new offer codes
      const updatedEnrolledSubjects = [...enrolledSubjects, ...this.checkedOfferCodes];

      // Update the enrolledTo field in the user document
      this.afs.collection('users').doc(this.currentID).update({
        enrolledTo: updatedEnrolledSubjects
      }).then(() => {
        alert('Enrollment successful, added to prospectus');
        // Optionally, you can reset the checkedOfferCodes array and update any other UI elements
        this.checkedOfferCodes = [];
        this.currentUnits = 0;
        // Additional UI updates if needed
      }).catch(error => {
        console.error('Error enrolling subjects:', error);
      });
    });
  } else {
    console.warn('No subjects selected for enrollment');
  }
}

}
