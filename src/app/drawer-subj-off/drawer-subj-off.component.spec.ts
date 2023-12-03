import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerSubjOffComponent } from './drawer-subj-off.component';

describe('DrawerSubjOffComponent', () => {
  let component: DrawerSubjOffComponent;
  let fixture: ComponentFixture<DrawerSubjOffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrawerSubjOffComponent]
    });
    fixture = TestBed.createComponent(DrawerSubjOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
