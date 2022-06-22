import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dailog2Component } from './dailog2.component';

describe('Dailog2Component', () => {
  let component: Dailog2Component;
  let fixture: ComponentFixture<Dailog2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dailog2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Dailog2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
