import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-edit-subj-offers',
  templateUrl: './edit-subj-offers.component.html',
  styleUrls: ['./edit-subj-offers.component.css']
})
export class EditSubjOffersComponent implements OnInit {

  subjectName = '';
  subjectCode = '';
  college = '';

  subjects!: Observable<any[]>;
  colleges!: Observable<any[]>;

  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.colleges = this.fetchColleges();
    
  }

  fetchColleges(): Observable<any[]> {
    return this.afs.collection('Colleges').snapshotChanges().pipe(
      map((colleges: any[]) => {
        return colleges.map(college => ({
          value: college.payload.doc.data()['CollegeName'], 
          label: college.payload.doc.data()['CollegeName']
        }));
      })
    );
  }

  fetchSubjects(collegeDocument: string): Observable<any[]> {
    console.log('Fetching subjects for college:', collegeDocument);
    return this.afs.collection('Subjects', ref => ref.where('college', '==', collegeDocument))
      .snapshotChanges().pipe(
        map((subjects: any[]) => {
          return subjects.map(subject => ({
            value: subject.payload.doc.id, 
            label: subject.payload.doc.data()['name'], 
            code: subject.payload.doc.data()['code'], 
          }));
        })
      );
  }
  

  addSubject(): void {
    const newSubject = { name: this.subjectName, code: this.subjectCode, college: this.college };
  
    this.afs.collection('Subjects').add(newSubject)
      .then(() => {
        console.log('Subject added successfully');
        this.subjectName = '';
        this.subjectCode = '';
      })
      .catch(error => {
        console.error('Error adding subject:', error);
      });
  }

  deleteSubject(subjectId: string): void {
    this.afs.collection('Subjects').doc(subjectId).delete()
      .then(() => {
        console.log('Subject deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting subject:', error);
      });
  }

  onCollegeSelected(): void {
    console.log('onCollegeSelected called');
    if (this.college) {
      this.subjects = this.fetchSubjects(this.college);
    }
  }

  showEditModal: boolean = false;
  selectedSubjectForEdit: any = null;

  openEditModal(subject: any): void {
    console.log("Opening modal for subject:", subject);
    this.selectedSubjectForEdit = { ...subject };
    this.showEditModal = true;
  }

  onSubjectUpdate(updatedSubject: any): void {
    if (!updatedSubject) {
      this.showEditModal = false;
      return;
    }
  }
}
