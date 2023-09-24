import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCharityComponent } from './manage-charity.component';

describe('ManageCharityComponent', () => {
  let component: ManageCharityComponent;
  let fixture: ComponentFixture<ManageCharityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCharityComponent]
    });
    fixture = TestBed.createComponent(ManageCharityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
