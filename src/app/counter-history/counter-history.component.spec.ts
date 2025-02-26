import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterHistoryComponent } from './counter-history.component';

describe('CounterHistoryComponent', () => {
  let component: CounterHistoryComponent;
  let fixture: ComponentFixture<CounterHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterHistoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
