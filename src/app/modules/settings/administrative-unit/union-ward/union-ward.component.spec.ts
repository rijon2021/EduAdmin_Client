/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UnionWardComponent } from './union-ward.component';

describe('UnionWardComponent', () => {
  let component: UnionWardComponent;
  let fixture: ComponentFixture<UnionWardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnionWardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnionWardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
