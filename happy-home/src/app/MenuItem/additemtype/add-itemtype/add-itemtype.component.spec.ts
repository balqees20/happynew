import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemtypeComponent } from './add-itemtype.component';

describe('AddItemtypeComponent', () => {
  let component: AddItemtypeComponent;
  let fixture: ComponentFixture<AddItemtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
