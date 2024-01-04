import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-edit-departments',
  templateUrl: './edit-departments.component.html',
  styleUrls: ['./edit-departments.component.css']
})
export class EditDepartmentsComponent implements OnInit {

  colleges!: Observable<any[]>;

  constructor(private firestore: AngularFirestore, private afs: AngularFirestore) {}

  ngOnInit() {
    this.colleges = this.fetchColleges();
  }

  fetchColleges(): Observable<any[]> {
    return this.afs.collection('Colleges').snapshotChanges().pipe(
      map((colleges: any[]) => {
        return colleges.map(college => ({
          value: college.payload.doc.id, 
          CollegeName: college.payload.doc.data()['CollegeName'],
          Abbreviation: college.payload.doc.data()['Abbreviation']
        }));
      })
    );
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
        alert('College successfully added!');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  showEditModal: boolean = false;
  selectedDepartmentForEdit: any = null;

  openEditModal(college: any): void {
    console.log("Opening modal for department:", college);
    this.selectedDepartmentForEdit = { 
      id: college.value, 
      CollegeName: college.CollegeName,
      Abbreviation: college.Abbreviation
    };
    this.showEditModal = true;
  }

  onCollegeChange(updatedCollege: any): void {
    if (!updatedCollege) {
      this.showEditModal = false;
      return;
    }
  }
  

}
