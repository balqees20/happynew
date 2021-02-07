import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemtypeComponent } from './list-itemtype.component';

describe('ListItemtypeComponent', () => {
  let component: ListItemtypeComponent;
  let fixture: ComponentFixture<ListItemtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
