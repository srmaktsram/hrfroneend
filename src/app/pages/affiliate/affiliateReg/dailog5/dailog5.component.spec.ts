import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dailog5Component } from './dailog5.component';

describe('Dailog5Component', () => {
  let component: Dailog5Component;
  let fixture: ComponentFixture<Dailog5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dailog5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Dailog5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
