import { BaseComponent } from '#components/core/base/base.component';
import { initQuillConfig } from '#config/quill.config';
import { Category } from '#models/category.model';
import { ComponentService } from '#services/component.service';
import { CampaignService } from '#services/http/campaign.service';
import { CategoryService } from '#services/http/category.service';
import { LocalStorageService } from '#services/storage.service';
import { DATE_CAMPAIGN_FORMAT } from '#utils/const';
import { onlyNumberInput } from '#utils/helpers';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { notEmpty } from 'src/app/validators/not-empty.validator';

@Component({
  selector: 'app-campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.scss'],
})
export class CampaignCreateComponent extends BaseComponent implements OnInit {
  selectedFileName: string;
  selectedFiles;
  quillConfig: any;
  quillStyles = { height: '250px' };

  form = this.fb.group({
    title: ['', [Validators.required, notEmpty]],
    subTitle: ['', [Validators.required, notEmpty]],
    mainCategory: ['', [Validators.required]],
    categoryId: [''],
    location: ['', [Validators.required, notEmpty]],
    fundingGoal: ['', [Validators.required, notEmpty]],
    currency: ['VND', [Validators.required, notEmpty]],
    targetLaunchDate: ['', [Validators.required]],
    story: ['', [Validators.required, notEmpty]],
    risk: ['', [Validators.required, notEmpty]],
    duration: ['', [Validators.required]],
    // rewards: ['', [Validators.required, notEmpty]],
  });

  mainCategories$: BehaviorSubject<Category[]> = new BehaviorSubject<
    Category[]
  >([]);
  constructor(
    protected componentService: ComponentService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private campaignService: CampaignService,
    private localStorageService: LocalStorageService
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    this.initQuillConfig();
    this.getCategories();
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const {
      title,
      subTitle,
      categoryId,
      location,
      fundingGoal,
      currency,
      targetLaunchDate,
      story,
      risk,
      duration,
    } = this.form.value;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('category', categoryId);
    formData.append('location', location);
    formData.append('fundingGoal', fundingGoal);
    formData.append('currency', currency);
    formData.append(
      'targetLaunchDate',
      moment(new Date(targetLaunchDate)).format(DATE_CAMPAIGN_FORMAT)
    );
    formData.append('story', story);
    formData.append('risk', risk);
    formData.append(
      'duration',
      moment(new Date(duration)).format(DATE_CAMPAIGN_FORMAT)
    );
    formData.append('rewards', JSON.stringify([]));
    formData.append('image', this.selectedFiles[0], this.selectedFileName);
    this.subscribeOnce(this.campaignService.create(formData), (res) => {
      if (res) {
        this.updateCreatorRole();
        this.componentService.message.showMessage('Create Campaign Success');
        this.redirect(['/admin/my-campaign']);
      }
    });
  }

  handleChangeMainCategory(value) {
    this.form.patchValue({
      categoryId: null,
    });
  }

  numberOnly(event): boolean {
    return onlyNumberInput(event);
  }

  selectFile(event) {
    this.selectedFileName = null;
    const fileList = event.target.files;
    const file = fileList[0];
    if (fileList && file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFiles = [file];
        this.selectedFileName = this.selectedFiles[0].name;
      };
    }
  }

  private getCategories() {
    this.subscribeOnce(this.categoryService.getParentCategories(), (res) => {
      this.mainCategories$.next(res);
    });
  }

  private initQuillConfig(): void {
    this.quillConfig = initQuillConfig((image: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('image', image);
        this.campaignService
          .uploadImage(formData)
          .pipe(
            catchError((e) => {
              reject();
              return throwError(e);
            })
          )
          .subscribe((url: string) => {
            resolve(url);
          });
      });
    });
  }

  private updateCreatorRole() {
    const userProfile = this.localStorageService.get('user_profile');
    const roles: any[] = JSON.parse(userProfile).roles;
    if (!roles?.some((role) => role?.name === 'creator')) {
      const updatedRoles = [...roles, { name: 'creator' }];
      const updatedProfile = {
        ...JSON.parse(userProfile),
        roles: updatedRoles,
      };
      this.localStorageService.set(
        'user_profile',
        JSON.stringify(updatedProfile)
      );
    }
  }
}
