import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePagesComponent } from './manage-pages.component';

describe('ManagePagesComponent', () => {
  let component: ManagePagesComponent;
  let fixture: ComponentFixture<ManagePagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePagesComponent]
    });
    fixture = TestBed.createComponent(ManagePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
