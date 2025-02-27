import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterItemComponent } from './counter-item.component';

describe('CounterItemComponent', () => {
  let component: CounterItemComponent;
  let fixture: ComponentFixture<CounterItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
