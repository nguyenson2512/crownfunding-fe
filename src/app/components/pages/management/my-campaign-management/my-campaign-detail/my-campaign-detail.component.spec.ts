import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCampaignDetailComponent } from './my-campaign-detail.component';

describe('MyCampaignDetailComponent', () => {
  let component: MyCampaignDetailComponent;
  let fixture: ComponentFixture<MyCampaignDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCampaignDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCampaignDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
