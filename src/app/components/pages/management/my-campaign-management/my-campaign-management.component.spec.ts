import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCampaignManagementComponent } from './my-campaign-management.component';

describe('MyCampaignManagementComponent', () => {
  let component: MyCampaignManagementComponent;
  let fixture: ComponentFixture<MyCampaignManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCampaignManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCampaignManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
