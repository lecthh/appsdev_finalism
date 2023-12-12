import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubjModalComponent } from './edit-subj-modal.component';

describe('EditSubjModalComponent', () => {
  let component: EditSubjModalComponent;
  let fixture: ComponentFixture<EditSubjModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSubjModalComponent]
    });
    fixture = TestBed.createComponent(EditSubjModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
