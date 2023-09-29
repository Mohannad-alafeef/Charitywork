import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCharitiesComponent } from './all-charities.component';

describe('AllCharitiesComponent', () => {
  let component: AllCharitiesComponent;
  let fixture: ComponentFixture<AllCharitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllCharitiesComponent]
    });
    fixture = TestBed.createComponent(AllCharitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
