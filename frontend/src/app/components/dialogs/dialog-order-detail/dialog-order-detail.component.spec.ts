import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrderDetailComponent } from './dialog-order-detail.component';

describe('DialogOrderDetailComponent', () => {
  let component: DialogOrderDetailComponent;
  let fixture: ComponentFixture<DialogOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
