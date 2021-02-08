import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountitemComponent } from './discountitem.component';

describe('DiscountitemComponent', () => {
  let component: DiscountitemComponent;
  let fixture: ComponentFixture<DiscountitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
