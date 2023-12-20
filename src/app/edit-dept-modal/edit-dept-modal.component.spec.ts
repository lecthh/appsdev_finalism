import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeptModalComponent } from './edit-dept-modal.component';

describe('EditDeptModalComponent', () => {
  let component: EditDeptModalComponent;
  let fixture: ComponentFixture<EditDeptModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDeptModalComponent]
    });
    fixture = TestBed.createComponent(EditDeptModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
