import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEnrollmentComponent } from './student-enrollment.component';

describe('StudentEnrollmentComponent', () => {
  let component: StudentEnrollmentComponent;
  let fixture: ComponentFixture<StudentEnrollmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentEnrollmentComponent]
    });
    fixture = TestBed.createComponent(StudentEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
