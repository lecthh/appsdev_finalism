import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-subj-offers',
  templateUrl: './edit-subj-offers.component.html',
  styleUrls: ['./edit-subj-offers.component.css']
})

export class EditSubjOffersComponent implements OnInit {

  subjectName = '';
  subjectCode = '';
  selectedCollege = 'scs';

  subjects$!: Observable<any[]>;
  colleges$!: Observable<any[]>;

  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.colleges$ = this.afs.collection('Colleges').valueChanges({ idField: 'value' });
    this.fetchSubjects();
  }

  addSubject(): void {
    const newSubject = { name: this.subjectName, code: this.subjectCode, college: this.selectedCollege };
  
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

  editSubject(subjectId: string, updatedName: string, updatedCode: string): void {
    this.afs.collection('Subjects').doc(subjectId).update({ name: updatedName, code: updatedCode })
      .then(() => {
        console.log('Subject updated successfully');
      })
      .catch(error => {
        console.error('Error updating subject:', error);
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

  fetchSubjects(): void {
    this.subjects$ = this.afs.collection('Subjects', ref => ref.where('college', '==', this.selectedCollege)).valueChanges({ idField: 'id' });
  }  

  onCollegeChange(): void {
    this.fetchSubjects();
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