import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-edit-dept-modal',
  templateUrl: './edit-dept-modal.component.html',
  styleUrls: ['./edit-dept-modal.component.css']
})
export class EditDeptModalComponent {
  @Input() college: any;
  @Output() updateCollege = new EventEmitter<any>();

  constructor(private afs: AngularFirestore) {}

  editCollege(collegeId: string, updatedName: string, updatedCode: string) {
    this.afs.collection('Colleges').doc(collegeId).update({ CollegeName: updatedName, Abbreviation: updatedCode })
      .then(() => {
        console.log('College updated');
      })
      .catch(error => {
        console.error('Error: ', error);
      })
  }

  closeModal(): void {
    this.updateCollege.emit(null);
  }
}
