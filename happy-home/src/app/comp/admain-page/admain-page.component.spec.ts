import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmainPageComponent } from './admain-page.component';

describe('AdmainPageComponent', () => {
  let component: AdmainPageComponent;
  let fixture: ComponentFixture<AdmainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
