import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubjOffersComponent } from './edit-subj-offers.component';

describe('EditSubjOffersComponent', () => {
  let component: EditSubjOffersComponent;
  let fixture: ComponentFixture<EditSubjOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSubjOffersComponent]
    });
    fixture = TestBed.createComponent(EditSubjOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
