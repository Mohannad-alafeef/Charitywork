import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCharitiesComponent } from './user-charities.component';

describe('UserCharitiesComponent', () => {
  let component: UserCharitiesComponent;
  let fixture: ComponentFixture<UserCharitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCharitiesComponent]
    });
    fixture = TestBed.createComponent(UserCharitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
