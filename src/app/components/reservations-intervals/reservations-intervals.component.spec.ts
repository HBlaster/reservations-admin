import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsIntervalsComponent } from './reservations-intervals.component';

describe('ReservationsIntervalsComponent', () => {
  let component: ReservationsIntervalsComponent;
  let fixture: ComponentFixture<ReservationsIntervalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsIntervalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationsIntervalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
