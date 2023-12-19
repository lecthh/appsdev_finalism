import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-subj-modal',
  templateUrl: './edit-subj-modal.component.html',
  styleUrls: ['./edit-subj-modal.component.css']
})
export class EditSubjModalComponent {
  @Input() subject: any;
  @Output() updateSubject = new EventEmitter<any>();

  constructor(private afs: AngularFirestore) {}

  editSubject(subjectId: string, updatedName: string, updatedCode: string): void {
    this.afs.collection('Subjects').doc(subjectId).update({ name: updatedName, code: updatedCode })
      .then(() => {
        console.log('Subject updated successfully');
      })
      .catch(error => {
        console.error('Error updating subject:', error);
      });
  }

  closeModal(): void {
    this.updateSubject.emit(null);
  }
}
