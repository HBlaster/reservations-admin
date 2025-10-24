import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentConfigComponent } from './current-config.component';

describe('CurrentConfigComponent', () => {
  let component: CurrentConfigComponent;
  let fixture: ComponentFixture<CurrentConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
