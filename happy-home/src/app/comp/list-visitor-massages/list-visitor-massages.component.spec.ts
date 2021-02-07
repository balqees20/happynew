import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVisitorMassagesComponent } from './list-visitor-massages.component';

describe('ListVisitorMassagesComponent', () => {
  let component: ListVisitorMassagesComponent;
  let fixture: ComponentFixture<ListVisitorMassagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVisitorMassagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVisitorMassagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
