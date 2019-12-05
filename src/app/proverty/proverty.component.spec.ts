import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvertyComponent } from './proverty.component';

describe('ProvertyComponent', () => {
  let component: ProvertyComponent;
  let fixture: ComponentFixture<ProvertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
