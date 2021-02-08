import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenmanageComponent } from './kitchenmanage.component';

describe('KitchenmanageComponent', () => {
  let component: KitchenmanageComponent;
  let fixture: ComponentFixture<KitchenmanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenmanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
