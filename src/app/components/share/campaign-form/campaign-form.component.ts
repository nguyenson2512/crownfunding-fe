import { BaseComponent } from '#components/core/base/base.component';
import { initQuillConfig } from '#config/quill.config';
import { IDocument, IMilestone, IReward } from '#models/campaign.model';
import { Category } from '#models/category.model';
import { CampaignDetailService } from '#services/campaign-detail.service';
import { ComponentService } from '#services/component.service';
import { CampaignService } from '#services/http/campaign.service';
import { CategoryService } from '#services/http/category.service';
import { DATE_CAMPAIGN_FORMAT, DEFAULT_REWARD } from '#utils/const';
import { onlyNumberInput } from '#utils/helpers';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { notEmpty } from 'src/app/validators/not-empty.validator';
import { DocumentFormComponent } from '../document-form/document-form.component';
import { ImageViewComponent } from '../image-view/image-view.component';
import { MilestoneFormComponent } from '../milestone-form/milestone-form.component';
import { RewardFormComponent } from '../reward-form/reward-form.component';

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
  selectedMainCategory: string;
  defaultReward = DEFAULT_REWARD;
  rewards$: BehaviorSubject<IReward[]> = new BehaviorSubject<IReward[]>([]);
  documents$: BehaviorSubject<IDocument[]> = new BehaviorSubject<IDocument[]>(
    []
  );
  milestones$: BehaviorSubject<IMilestone[]> = new BehaviorSubject<
    IMilestone[]
  >([]);

  form = this.fb.group({
    title: ['', [Validators.required, notEmpty]],
    subTitle: ['', [Validators.required, notEmpty]],
    mainCategory: ['', [Validators.required]],
    categoryId: [''],
    location: ['', [Validators.required, notEmpty]],
    fundingGoal: ['', [Validators.min(1), Validators.required, notEmpty]],
    currency: ['USD', [Validators.required, notEmpty]],
    targetLaunchDate: ['', [Validators.required]],
    story: ['', [Validators.required, notEmpty]],
    risk: ['', [Validators.required, notEmpty]],
    duration: ['', [Validators.required]],
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
    private categoryService: CategoryService,
    private campaignDetailService: CampaignDetailService
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    const { id } = this.routeParams;
    if (id) {
      this.isEdit = true;
      this.campaignId = id;
    }
    this.campaignDetailService.setItemsOffering(new Set());

    this.initQuillConfig();
    this.subscribeOnce(this.categoryService.getParentCategories(), (res) => {
      this.mainCategories$.next(res);
      if (this.isEdit) {
        this.initCampaignDetails();
      } else {
        this.rewards$.next([this.defaultReward]);
      }
    });
  }

  handleChangeMainCategory(value: Category) {
    this.selectedMainCategory = value?._id;
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
    const rewards = this.rewards$.getValue();
    rewards.shift();
    this.formComplete.emit({
      ...this.form.value,
      selectedFileName: this.selectedFileName,
      selectedFiles: this.selectedFiles,
      id: this.campaignId,
      categoryId: this.form.value.categoryId || this.selectedMainCategory,
      rewards,
      documents: this.documents$.getValue(),
      milestones: this.milestones$.getValue(),
    });
  }

  private initCampaignDetails() {
    this.subscribeOnce(
      this.campaignService.getDetail(this.campaignId),
      (data) => {
        if (data) {
          if (!data?.category?.parentId) {
            this.form.patchValue({
              mainCategory: this.mainCategories$
                .getValue()
                .find((item) => item._id === data?.category?._id),
            });
            this.selectedMainCategory = data?.category?._id;
          } else {
            this.form.patchValue({
              mainCategory: this.mainCategories$
                .getValue()
                .find((item) => item._id === data?.category?.parentId),
            });
            this.form.patchValue({
              categoryId: data?.category?._id,
            });
          }
          this.form.patchValue({
            title: data?.title,
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
          const itemsSet = new Set();

          const formatRewards = data.rewards.map((reward) => {
            if (reward?.itemsOffering) {
              const itemsOffering = JSON.parse(reward.itemsOffering);
              itemsOffering.map((item) => {
                itemsSet.add(item?.name);
              });
              return {
                ...reward,
                itemsOffering,
              };
            }
            return reward;
          });
          itemsSet;
          this.campaignDetailService.setItemsOffering(itemsSet);
          this.rewards$.next(formatRewards);
          this.documents$.next(data?.documents);
          this.milestones$.next(data?.milestones || []);
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

  onRemove(reward, index) {
    const rewards = this.rewards$.getValue();
    rewards.splice(index, 1);
    this.rewards$.next(rewards);
  }

  onEdit(reward, index) {
    this.componentService.dialog
      .showDialog(RewardFormComponent, {
        data: { isEdit: true, reward },
        maxHeight: '600px',
        minHeight: '500px',
        width: '600px',
        autoFocus: false,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res) => {
        if (!res) return;
        const newReward: IReward = {
          ...res,
          amount: +res?.amount,
          currency: 'USD',
        };

        const rewards = this.rewards$.getValue();
        this.updateItems(newReward?.itemsOffering);
        const updatedRewards = [
          ...rewards.slice(0, index),
          newReward,
          ...rewards.slice(index + 1),
        ];
        this.rewards$.next(updatedRewards);
      });
  }

  handleAddDocument() {
    this.componentService.dialog
      .showDialog(DocumentFormComponent, {
        data: { isEdit: false },
        maxHeight: '600px',
        width: '600px',
        autoFocus: false,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res) => {
        if (!res) return;
        const newDocument: IDocument = {
          ...res,
        };
        this.documents$.next([...this.documents$.getValue(), newDocument]);
      });
  }

  handleEditMilestone(milestone, index) {
    const sum = this.milestones$
      .getValue()
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue?.amount,
        0
      );
    this.componentService.dialog
      .showDialog(MilestoneFormComponent, {
        data: {
          isEdit: true,
          milestone,
          maximumAmount: this.form.value.fundingGoal - sum,
        },
        maxHeight: '600px',
        width: '600px',
        autoFocus: false,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res) => {
        if (!res) return;
        const newMilestone: IMilestone = {
          ...res,
          estimateDeadline: moment(new Date(res?.estimateDeadline))?.format(
            DATE_CAMPAIGN_FORMAT
          ),
        };
        const milestones = this.milestones$.getValue();
        const updatedMilestones = [
          ...milestones.slice(0, index),
          newMilestone,
          ...milestones.slice(index + 1),
        ];
        this.milestones$.next(updatedMilestones);
      });
  }

  handleAddMilestone() {
    const sum = this.milestones$
      .getValue()
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue?.amount,
        0
      );
    this.componentService.dialog
      .showDialog(MilestoneFormComponent, {
        data: {
          isEdit: false,
          maximumAmount: this.form.value.fundingGoal - sum,
        },
        maxHeight: '600px',
        width: '600px',
        autoFocus: false,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res) => {
        if (!res) return;
        const newMilestone: IMilestone = {
          ...res,
          estimateDeadline: moment(new Date(res?.estimateDeadline))?.format(
            DATE_CAMPAIGN_FORMAT
          ),
        };
        this.milestones$.next([...this.milestones$.getValue(), newMilestone]);
      });
  }

  handleEditDocument(document, index) {
    this.componentService.dialog
      .showDialog(DocumentFormComponent, {
        data: { isEdit: true, document },
        maxHeight: '600px',
        width: '600px',
        autoFocus: false,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res) => {
        if (!res) return;
        console.log({ res });
        const newDocument: IDocument = {
          ...res,
        };
        const documents = this.documents$.getValue();

        const updatedDocuments = [
          ...documents.slice(0, index),
          newDocument,
          ...documents.slice(index + 1),
        ];
        this.documents$.next(updatedDocuments);
      });
  }

  handleDeleteDocument(index) {
    const documents = this.documents$.getValue();
    documents.splice(index, 1);
    this.documents$.next(documents);
  }

  handleAddReward() {
    this.componentService.dialog
      .showDialog(RewardFormComponent, {
        data: { isEdit: false },
        maxHeight: '600px',
        minHeight: '500px',
        width: '600px',
        autoFocus: false,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res) => {
        if (!res) return;
        const newReward: IReward = {
          ...res,
          amount: +res?.amount,
          currency: 'USD',
        };
        this.updateItems(newReward?.itemsOffering);
        this.rewards$.next([...this.rewards$.getValue(), newReward]);
      });
  }

  private updateItems(itemsOffering) {
    console.log({ itemsOffering });
    console.log(this.campaignDetailService.itemsOfferingValue);
    const itemNames = itemsOffering.map((item) => item?.name);
    const updatedItems = new Set([
      ...itemNames,
      ...this.campaignDetailService.itemsOfferingValue,
    ]);
    this.campaignDetailService.setItemsOffering(updatedItems);
  }

  onChangeFundingGoal() {
    this.milestones$.next([]);
  }
}
