import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-edit-dept-modal',
  templateUrl: './edit-dept-modal.component.html',
  styleUrls: ['./edit-dept-modal.component.css']
})
export class EditDeptModalComponent {
  @Input() college: any;
  @Output() updateCollege = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef, private afs: AngularFirestore) {}

  editCollege(): void {
    console.log('Editing college:', this.college);
    const { id, CollegeName, Abbreviation } = this.college;
    this.afs.collection('Colleges').doc(id).update({ CollegeName, Abbreviation })
      .then(() => {
        console.log('College updated');
        this.updateCollege.emit({ CollegeName, Abbreviation });
        // Manually trigger change detection
        this.cdr.detectChanges();
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  }

  closeModal(): void {
    this.updateCollege.emit(null);
  }
}
