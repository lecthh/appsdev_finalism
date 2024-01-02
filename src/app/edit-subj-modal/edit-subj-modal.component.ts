import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-edit-subj-modal',
  templateUrl: './edit-subj-modal.component.html',
  styleUrls: ['./edit-subj-modal.component.css']
})
export class EditSubjModalComponent {
  @Input() subject: any;
  @Output() updateSubject = new EventEmitter<any>();

  constructor(private afs: AngularFirestore) {}

  editSubject(): void {
    console.log('Editing sub:', this.subject);
    const { id, name, code} = this.subject;
    this.afs.collection('Subjects').doc(id).update({ name, code})
      .then(() => {
        console.log('Subject updated successfully');
        this.updateSubject.emit({name, code});
      })
      .catch(error => {
        console.error('Error updating subject:', error);
      });
  }

  closeModal(): void {
    this.updateSubject.emit(null);
  }
}
