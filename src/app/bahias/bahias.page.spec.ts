import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BahiasPage } from './bahias.page';

describe('BahiasPage', () => {
  let component: BahiasPage;
  let fixture: ComponentFixture<BahiasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BahiasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BahiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
