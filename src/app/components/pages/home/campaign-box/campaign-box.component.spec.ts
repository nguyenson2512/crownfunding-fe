import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignBoxComponent } from './campaign-box.component';

describe('CampaignBoxComponent', () => {
  let component: CampaignBoxComponent;
  let fixture: ComponentFixture<CampaignBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
