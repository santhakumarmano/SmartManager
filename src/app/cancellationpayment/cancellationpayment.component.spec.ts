import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationpaymentComponent } from './cancellationpayment.component';

describe('CancellationpaymentComponent', () => {
  let component: CancellationpaymentComponent;
  let fixture: ComponentFixture<CancellationpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancellationpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
