import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMethodComponent } from './dialog-method.component';

describe('DialogMethodComponent', () => {
  let component: DialogMethodComponent;
  let fixture: ComponentFixture<DialogMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
