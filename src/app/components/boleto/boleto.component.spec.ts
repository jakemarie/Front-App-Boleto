/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BoletoComponent } from './boleto.component';

describe('BoletoComponent', () => {
  let component: BoletoComponent;
  let fixture: ComponentFixture<BoletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
