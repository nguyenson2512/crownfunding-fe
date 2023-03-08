import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardConfirmComponent } from './reward-confirm.component';

describe('RewardConfirmComponent', () => {
  let component: RewardConfirmComponent;
  let fixture: ComponentFixture<RewardConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
