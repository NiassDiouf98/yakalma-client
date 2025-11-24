import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastSuccess } from './toast-success';

describe('ToastSuccess', () => {
  let component: ToastSuccess;
  let fixture: ComponentFixture<ToastSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastSuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
