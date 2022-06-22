import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dailog4Component } from './dailog4.component';

describe('Dailog4Component', () => {
  let component: Dailog4Component;
  let fixture: ComponentFixture<Dailog4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dailog4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Dailog4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
