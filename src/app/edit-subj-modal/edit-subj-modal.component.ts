import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-subj-modal',
  templateUrl: './edit-subj-modal.component.html',
  styleUrls: ['./edit-subj-modal.component.css']
})
export class EditSubjModalComponent {
  @Input() subject: any;
  @Output() updateSubject = new EventEmitter<any>();

  submitEdit(): void {
    this.updateSubject.emit(this.subject);
  }

  closeModal(): void {
    this.updateSubject.emit(null);
  }
}
