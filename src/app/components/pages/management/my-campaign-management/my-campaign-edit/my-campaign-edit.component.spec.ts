import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCampaignEditComponent } from './my-campaign-edit.component';

describe('MyCampaignEditComponent', () => {
  let component: MyCampaignEditComponent;
  let fixture: ComponentFixture<MyCampaignEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCampaignEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCampaignEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
