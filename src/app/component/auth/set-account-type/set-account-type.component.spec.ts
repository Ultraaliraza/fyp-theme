import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAccountTypeComponent } from './set-account-type.component';

describe('SetAccountTypeComponent', () => {
  let component: SetAccountTypeComponent;
  let fixture: ComponentFixture<SetAccountTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetAccountTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetAccountTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
