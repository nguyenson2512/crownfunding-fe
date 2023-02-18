import { BaseComponent } from '#components/core/base/base.component';
import { initQuillConfig } from '#config/quill.config';
import { Category } from '#models/category.model';
import { ComponentService } from '#services/component.service';
import { CampaignService } from '#services/http/campaign.service';
import { CategoryService } from '#services/http/category.service';
import { onlyNumberInput } from '#utils/helpers';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { notEmpty } from 'src/app/validators/not-empty.validator';
import { ImageViewComponent } from '../image-view/image-view.component';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss'],
})
export class CampaignFormComponent extends BaseComponent implements OnInit {
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
    image: [''],
  });

  isEdit: boolean = false;
  hasImage: boolean = false;
  campaignId: string;
  mainCategories$: BehaviorSubject<Category[]> = new BehaviorSubject<
    Category[]
  >([]);

  @Output() formComplete = new EventEmitter();
  constructor(
    protected componentService: ComponentService,
    private fb: FormBuilder,
    private campaignService: CampaignService,
    private categoryService: CategoryService
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    const { id } = this.routeParams;
    if (id) {
      this.isEdit = true;
      this.campaignId = id;
    }

    this.initQuillConfig();
    this.subscribeOnce(this.categoryService.getParentCategories(), (res) => {
      this.mainCategories$.next(res);
      if (this.isEdit) {
        this.initCampaignDetails();
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

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.formComplete.emit({
      ...this.form.value,
      selectedFileName: this.selectedFileName,
      selectedFiles: this.selectedFiles,
      id: this.campaignId,
    });
  }

  private initCampaignDetails() {
    this.subscribeOnce(
      this.campaignService.getDetail(this.campaignId),
      (data) => {
        if (data) {
          this.form.patchValue({
            mainCategory: this.mainCategories$
              .getValue()
              .find((item) => item._id === data?.category?.parentId),
          });
          this.form.patchValue({
            title: data?.title,
            categoryId: data?.category?._id,
            subTitle: data?.subTitle,
            location: data?.location,
            fundingGoal: data?.fundingGoal.toString(),
            currency: data?.currency,
            targetLaunchDate: new Date(data?.targetLaunchDate),
            story: data?.story,
            risk: data?.risk,
            image: data?.image,
            duration: new Date(data?.duration),
          });
          if (data?.image) {
            this.hasImage = true;
          }
          console.log(this.form.value);
        }
      }
    );
  }

  upload(files) {
    const formData = new FormData();
    formData.append('image', files[0]);
    this.subscribeOnce(
      this.campaignService.uploadImage(formData).pipe(
        catchError((e) => {
          return throwError(e);
        })
      ),
      (url) => {
        this.form.patchValue({
          image: url,
        });
      }
    );
  }

  showImage(url: string) {
    this.dialogService.showDialog(ImageViewComponent, {
      data: {
        url,
      },
      height: '400px',
      width: '600px',
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
}
