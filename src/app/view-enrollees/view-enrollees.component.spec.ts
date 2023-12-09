import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEnrolleesComponent } from './view-enrollees.component';

describe('ViewEnrolleesComponent', () => {
  let component: ViewEnrolleesComponent;
  let fixture: ComponentFixture<ViewEnrolleesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEnrolleesComponent]
    });
    fixture = TestBed.createComponent(ViewEnrolleesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
