import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannusersComponent } from './bannusers.component';

describe('BannusersComponent', () => {
  let component: BannusersComponent;
  let fixture: ComponentFixture<BannusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
