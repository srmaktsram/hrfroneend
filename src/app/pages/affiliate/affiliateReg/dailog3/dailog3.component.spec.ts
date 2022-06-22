import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dailog3Component } from './dailog3.component';

describe('Dailog3Component', () => {
  let component: Dailog3Component;
  let fixture: ComponentFixture<Dailog3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dailog3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Dailog3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
