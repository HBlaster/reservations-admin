import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsDailyComponent } from './reservations-daily.component';

describe('ReservationsDailyComponent', () => {
  let component: ReservationsDailyComponent;
  let fixture: ComponentFixture<ReservationsDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsDailyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationsDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
