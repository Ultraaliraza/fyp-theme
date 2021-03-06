import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDonationsComponent } from './donations.component';

describe('DonationsComponent', () => {
  let component: AdminDonationsComponent;
  let fixture: ComponentFixture<AdminDonationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDonationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
