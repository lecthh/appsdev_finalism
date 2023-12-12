import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-departments',
  templateUrl: './edit-departments.component.html',
  styleUrls: ['./edit-departments.component.css']
})
export class EditDepartmentsComponent implements OnInit {

  colleges!: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.colleges = this.firestore.collection('Colleges').valueChanges();
  }

  async submitForm(documentId: string, collegeName: string, abbreviation: string): Promise<void> {
    
    const docSnapshot = await this.firestore.collection('Colleges').doc(documentId).get().toPromise();

    if (docSnapshot && docSnapshot.exists) {
      alert('Document ID already exists. Please choose a different ID.');
      return;
    }

    const collegeNameSnapshot = await this.firestore.collection('Colleges', ref =>
      ref.where('CollegeName', '==', collegeName)).get().toPromise();

    if (collegeNameSnapshot && !collegeNameSnapshot.empty) {
      alert('College Name already exists. Please choose a different College Name.');
      return;
    }

    const abbreviationSnapshot = await this.firestore.collection('Colleges', ref =>
      ref.where('Abbreviation', '==', abbreviation)).get().toPromise();

    if (abbreviationSnapshot && !abbreviationSnapshot.empty) {
      alert('Abbreviation already exists. Please choose a different Abbreviation.');
      return;
    }

    const newCollege = {
      Abbreviation: abbreviation,
      CollegeName: collegeName
    };

    this.firestore.collection('Colleges').doc(documentId).set(newCollege)
      .then(() => {
        alert('Document successfully added!');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }
}
